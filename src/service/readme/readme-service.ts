import {IReadmeService} from "./i-readme-service";
import {IReadmeServiceResetResult} from "./i-readme-service-reset-result";
import {IReadmeServiceGenerateImageOptions} from "./i-readme-service-generate-image-options";
import {IConfig} from "../../config/i-config";
import {IFormatter} from "../../formatter/i-formatter";
import {ILicenseService} from "../license/i-license-service";
import {IReadmeServiceResetOptions} from "./i-readme-service-reset-options";
import {IContributor, IPackageJson} from "../../package-json/i-package-json";
import {LicenseName} from "../license/license-name";
import {IBackingService} from "../backing-service/i-backing-service";
import {IReadmeServiceUpgradeOptions} from "./i-readme-service-upgrade-options";
import {IReadmeServiceUpgradeResult} from "./i-readme-service-upgrade-result";
import {IMarkdownParserService} from "../parser/markdown/i-markdown-parser-service";
import {IMarkdownHeaderNode} from "../parser/markdown/ast/i-markdown-node";
import {MarkdownNodeKind} from "../parser/markdown/ast/markdown-node-kind";
import {IReadmeServiceConfig, IReadmeServiceHeaderConfig} from "./i-readme-service-config";
import {IReadmeServiceHeaderOptions} from "./i-readme-service-header-options";
import {IContributorService} from "../contributor-service/i-contributor-service";

/**
 * A service that helps with working with READMEs
 */
export class ReadmeService implements IReadmeService {
	constructor(
		private readonly config: IConfig,
		private readonly readmeServiceConfig: IReadmeServiceConfig,
		private readonly formatter: IFormatter,
		private readonly licenseService: ILicenseService,
		private readonly backingService: IBackingService,
		private readonly contributorService: IContributorService,
		private readonly markdownParserService: IMarkdownParserService
	) {}

	/**
	 * Creates a new, clean, README file
	 * @param {IReadmeServiceResetOptions} options
	 * @returns {Promise<IReadmeServiceResetResult>}
	 */
	public async reset({packageJson, blacklist}: IReadmeServiceResetOptions): Promise<IReadmeServiceResetResult> {
		const headerOptions = await this.getHeaderOptions(packageJson, blacklist);

		return {
			content: await this.format(`
${this.introHeader(headerOptions)}
${this.descriptionHeader(headerOptions)}
${this.installHeader(headerOptions)}
${this.usageHeader(headerOptions)}
${this.contributingHeader(headerOptions)}
${this.maintainersHeader(headerOptions)}
${this.faqHeader(headerOptions)}
${this.backersHeader(headerOptions)}
${this.licenseHeader(headerOptions)}`)
		};
	}

	/**
	 * Upgrades an existing README
	 * @param {IReadmeServiceUpgradeOptions} options
	 * @returns {Promise<IReadmeServiceUpgradeResult>}
	 */
	public async upgrade({packageJson, readme, blacklist}: IReadmeServiceUpgradeOptions): Promise<IReadmeServiceUpgradeResult> {
		let newReadme = readme;
		const headerOptions = await this.getHeaderOptions(packageJson, blacklist);
		const readmeHeaders = this.getReadmeHeaders(newReadme);
		const allSchemaHeaders = <[keyof IReadmeServiceConfig, IReadmeServiceHeaderConfig][]>Object.entries(this.readmeServiceConfig);
		const readmeHeadersRaw = new Set(readmeHeaders.map(header => header.children.map(child => child.raw).join("")));

		const missingHeaders = allSchemaHeaders
			.filter(([, value]) => {
				const computedHeader = value.name(packageJson);
				return !readmeHeadersRaw.has(computedHeader) && !this.headerIsBlacklisted(value.identifier, blacklist);
			})
			.map(([key]) => key);

		missingHeaders.forEach(header => {
			switch (header) {
				case "introHeader": {
					newReadme = `${this.introHeader(headerOptions)}\n${newReadme}`;
					break;
				}

				default: {
					newReadme = `${newReadme}\n${this[header](headerOptions)}`;
					break;
				}
			}
		});

		return {content: await this.format(newReadme)};
	}

	/**
	 * Formats the given text
	 * @param {string} text
	 * @returns {string}
	 */
	private async format(text: string): Promise<string> {
		return await this.formatter.format(text, {...this.config.formatOptions, parser: "markdown"});
	}

	/**
	 * Gets the header options to use
	 * @param {IPackageJson} packageJson
	 * @param {string[]} blacklist
	 * @returns {Promise<IReadmeServiceHeaderOptions>}
	 */
	private async getHeaderOptions(packageJson: IPackageJson, blacklist: string[]): Promise<IReadmeServiceHeaderOptions> {
		return {
			packageJson,
			contributors: this.contributorService.getContributors(packageJson),
			license: this.getLicense(packageJson),
			backers: await this.backingService.getBackers({packageJson}),
			blacklist
		};
	}

	/**
	 * Gets the license with a fallback to the default one
	 * @param {IPackageJson} packageJson
	 * @returns {LicenseName}
	 */
	private getLicense(packageJson: IPackageJson): LicenseName {
		return packageJson.license != null ? packageJson.license : this.config.defaultLicense;
	}

	/**
	 * Gets the intro section for a README
	 * @param {IPackageJson} packageJson
	 * @param {string} license
	 * @param {string[]} blacklist
	 * @returns {string}
	 */
	private introHeader({packageJson, license, blacklist}: IReadmeServiceHeaderOptions): string {
		if (this.headerIsBlacklisted(this.readmeServiceConfig.introHeader.identifier, blacklist)) return "";
		if (packageJson.name == null) return "";

		return `
${
	packageJson.scaffold == null || packageJson.scaffold.logo == null || packageJson.scaffold.logo === ""
		? ""
		: `${this.generateImage({height: this.config.readme.logoHeight, alt: `Logo for ${packageJson.name}`, imageUrl: packageJson.scaffold.logo})}<br>`
}
${
	packageJson.name == null
		? ""
		: this.generateImage({
				height: this.config.readme.badgeHeight,
				alt: "Downloads per month",
				url: `https://npmcharts.com/compare/${packageJson.name}?minimal=true`,
				imageUrl: `https://img.shields.io/npm/dm/${encodeURIComponent(packageJson.name)}.svg`
		  })
}
${
	packageJson.name == null
		? ""
		: this.generateImage({
				height: this.config.readme.badgeHeight,
				alt: "Dependencies",
				url: `https://david-dm.org/${this.stripLeadingScope(packageJson.name)}`,
				imageUrl: `https://img.shields.io/david/${this.stripLeadingScope(packageJson.name)}.svg`
		  })
}
${
	packageJson.name == null
		? ""
		: this.generateImage({
				height: this.config.readme.badgeHeight,
				alt: "NPM Version",
				url: `https://www.npmjs.com/package/${packageJson.name}`,
				imageUrl: `https://badge.fury.io/js/${encodeURIComponent(packageJson.name)}.svg`
		  })
}
${
	packageJson.repository == null || packageJson.repository.url == null
		? ""
		: this.generateImage({
				height: this.config.readme.badgeHeight,
				alt: "Contributors",
				url: `https://github.com/${this.takeGithubRepositoryName(packageJson.repository.url)}/graphs/contributors`,
				imageUrl: `https://img.shields.io/github/contributors/${encodeURIComponent(this.takeGithubRepositoryName(packageJson.repository.url))}.svg`
		  })
}
${this.generateImage({height: this.config.readme.badgeHeight, alt: `${license} License`, ...this.licenseService.getLicense(license)})}
${
	packageJson.scaffold == null || packageJson.scaffold.patreonUserId == null
		? ""
		: this.generateImage({
				height: this.config.readme.badgeHeight,
				alt: "Support on Patreon",
				url: `https://www.patreon.com/bePatron?u=${packageJson.scaffold.patreonUserId}`,
				imageUrl: `https://c5.patreon.com/external/logo/become_a_patron_button@2x.png`
		  })
}

${"#".repeat(this.readmeServiceConfig.introHeader.depth)} ${this.readmeServiceConfig.introHeader.name(packageJson)}
${packageJson.description == null ? "" : `> ${packageJson.description}`}`;
	}

	/**
	 * Returns true if the given header is blacklisted
	 * @param {string} rawHeader
	 * @param {string[]} blacklist
	 */
	private headerIsBlacklisted(rawHeader: string, blacklist: string[]): boolean {
		if (blacklist.length < 1) return false;
		return blacklist.some(b => b.toLowerCase() === rawHeader.toLowerCase());
	}

	/**
	 * Gets the 'License' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private licenseHeader({packageJson, license, contributors, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.licenseHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.licenseHeader.identifier, blacklist)) return "";
		return `
${"#".repeat(this.readmeServiceConfig.licenseHeader.depth)} ${headerName}

${license} © ${contributors.map(contributor => this.generateLinkToContributor(contributor)).join(", ")}`;
	}

	/**
	 * Gets the 'FAQ' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private faqHeader({packageJson, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.faqHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.faqHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.faqHeader.depth)} ${headerName}

<!-- Write your FAQ here -->`;
	}

	/**
	 * Gets the 'Contributing' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private contributingHeader({packageJson, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.contributingHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.contributingHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.contributingHeader.depth)} ${headerName}

Do you want to contribute? Awesome! Please follow [these recommendations](./CONTRIBUTING.md).`;
	}

	/**
	 * Gets the 'Install' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private installHeader({packageJson, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.installHeader.name(packageJson);
		if (packageJson.name == null || this.headerIsBlacklisted(this.readmeServiceConfig.installHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.installHeader.depth)} ${headerName}

${"#".repeat(this.readmeServiceConfig.installHeader.depth + 1)} NPM

\`\`\`
$ npm install ${packageJson.name}
\`\`\`

${"#".repeat(this.readmeServiceConfig.installHeader.depth + 1)} Yarn

\`\`\`
$ yarn add ${packageJson.name}
\`\`\`

${"#".repeat(this.readmeServiceConfig.installHeader.depth + 1)} Run once with NPX

\`\`\`
$ npx ${packageJson.name}
\`\`\``;
	}

	/**
	 * Gets the 'Usage' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private usageHeader({packageJson, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.usageHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.usageHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.usageHeader.depth)} ${headerName}

<!-- Write usage description here -->`;
	}

	/**
	 * Gets the 'Description' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private descriptionHeader({packageJson, blacklist}: IReadmeServiceHeaderOptions): string {
		const headerName = this.readmeServiceConfig.descriptionHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.descriptionHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.descriptionHeader.depth)} ${headerName}

<!-- Write description here -->`;
	}

	/**
	 * Gets the 'Maintainers' section for a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private maintainersHeader({packageJson, contributors, blacklist}: IReadmeServiceHeaderOptions): string {
		if (contributors.length === 0) return "";
		const headerName = this.readmeServiceConfig.maintainersHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.maintainersHeader.identifier, blacklist)) return "";

		return `
${"#".repeat(this.readmeServiceConfig.maintainersHeader.depth)} ${headerName}

${contributors
	.map(contributor => {
		let str = `- `;
		// If the contributor has an image, place it before anything else.
		if (contributor.imageUrl != null) {
			str += this.generateImage({
				alt: contributor.name,
				height: this.config.readme.teamMemberHeight,
				url: contributor.url,
				imageUrl: contributor.imageUrl
			});
		}
		str += ` ${this.generateLinkToContributor(contributor)}`;

		// Also add the role of the contributor, if available
		if (contributor.role != null) {
			str += `: *${contributor.role}*`;
		}
		return str;
	})
	.join("\n")}`;
	}

	/**
	 * Gets the 'Backers' section of a README
	 * @param {IReadmeServiceHeaderOptions} options
	 * @returns {string}
	 */
	private backersHeader({packageJson, backers, blacklist}: IReadmeServiceHeaderOptions): string {
		if (packageJson.scaffold == null || packageJson.scaffold.patreonUserId == null) return "";
		const headerName = this.readmeServiceConfig.backersHeader.name(packageJson);
		if (this.headerIsBlacklisted(this.readmeServiceConfig.backersHeader.identifier, blacklist)) return "";

		const top = `
${"#".repeat(this.readmeServiceConfig.backersHeader.depth)} ${headerName}

[Become a backer](https://www.patreon.com/bePatron?u=${packageJson.scaffold.patreonUserId}) and get your name, logo, and link to your site listed here.`;

		let bottom = "";
		Object.keys(backers).forEach(kind => {
			bottom += `\n### ${kind}\n`;
			bottom += packageJson
				.scaffold!.backers![kind].map(backer => this.generateImage({height: this.config.readme.backerHeight, url: backer.url, imageUrl: backer.imageUrl, alt: backer.name}))
				.join(" ");
		});

		return `${top}${bottom}`;
	}

	/**
	 * Generates a link to a contributor
	 * @param {IContributor} options
	 * @returns {string}
	 */
	private generateLinkToContributor({name, url}: IContributor): string {
		return url == null ? name : `[${name}](${url})`;
	}

	/**
	 * Generates an embedded image
	 * @param {IReadmeServiceGenerateImageOptions} options
	 * @returns {string}
	 */
	private generateImage({alt, url, imageUrl, height}: IReadmeServiceGenerateImageOptions): string {
		const anchor = (content: string) => `<a href="${url}">${content}</a>`;

		// noinspection CheckTagEmptyBody
		const img = `<img alt="${alt}" src="${imageUrl}" height="${height}"></img>`;

		if (url == null && imageUrl == null) {
			return alt;
		}

		if (url == null && imageUrl != null) {
			return img;
		}

		if (url != null && imageUrl == null) {
			return anchor(alt);
		}

		return anchor(img);
	}

	/**
	 * Gets all sections of the provided README
	 * @param {string} readme
	 * @returns {IMarkdownHeaderNode[]}
	 */
	private getReadmeHeaders(readme: string): IMarkdownHeaderNode[] {
		const documentNode = this.markdownParserService.parse(readme);
		return <IMarkdownHeaderNode[]>documentNode.children.filter(child => child.type === MarkdownNodeKind.Header);
	}

	/**
	 * strips the leading "@" from the given name, if it starts with it
	 * @param {string} name
	 * @returns {string}
	 */
	private stripLeadingScope(name: string): string {
		return name.startsWith("@") ? name.slice(1) : name;
	}

	/**
	 * Takes the Github repository name from the given name
	 * @param {string} name
	 * @returns {string}
	 */
	private takeGithubRepositoryName(name: string): string {
		return name.replace(/(http?s?:\/\/?)?(www\.)?github.com\//g, "").replace(".git", "");
	}
}
