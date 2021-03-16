import {GenerateReadmeOptions} from "./generate-readme-options";
import {SectionKind} from "../../section/section-kind";
import {GenerateReadmeContext} from "./generate-readme-context";
import {getBadges} from "../../badge/get-badges/get-badges";
import {getRelevantSections} from "../../section/get-relevant-sections/get-relevant-sections";
import {formatImage} from "../../markdown/format-image/format-image";
import {getShadowSectionMark} from "../get-shadow-section-mark/get-shadow-section-mark";
import {getContributorsFromPackage} from "../../contributor/get-contributors-from-package";
import {CONSTANT} from "../../constant/constant";
import {findLicense} from "../../license/find-license/find-license";
import {formatContributor} from "../../contributor/format-contributor";
import {listFormat} from "../../util/list-format/list-format";
import {formatUrl} from "../../markdown/format-url/format-url";
import toc from "markdown-toc";
import {join} from "path";
import {Contributor} from "../../contributor/contributor";

/**
 * Generates the text for a README.md based on the given options
 *
 * @param options
 * @returns
 */
export async function generateReadme(options: GenerateReadmeOptions): Promise<string> {
	const sections = getRelevantSections(options);

	const context: GenerateReadmeContext = {
		...options,
		sections,
		str: options.existingReadme != null ? options.existingReadme : ""
	};

	if (sections.has(SectionKind.LOGO)) {
		await generateLogoSection(context);
	}

	if (sections.has(SectionKind.DESCRIPTION_SHORT)) {
		await generateDescriptionShortSection(context);
	}

	if (sections.has(SectionKind.BADGES)) {
		await generateBadgesSection(context);
	}

	if (sections.has(SectionKind.DESCRIPTION_LONG)) {
		await generateDescriptionLongSection(context);
	}

	if (sections.has(SectionKind.FEATURES)) {
		await generateFeaturesSection(context);
	}

	if (sections.has(SectionKind.FEATURE_IMAGE)) {
		await generateFeatureImageSection(context);
	}

	if (sections.has(SectionKind.BACKERS)) {
		await generateBackersSection(context);
	}

	if (sections.has(SectionKind.TOC)) {
		await generateTableOfContentsSection(context, true);
	}

	if (sections.has(SectionKind.INSTALL)) {
		await generateInstallSection(context);
	}

	if (sections.has(SectionKind.USAGE)) {
		await generateUsageSection(context);
	}

	if (sections.has(SectionKind.CONTRIBUTING)) {
		await generateContributingSection(context);
	}

	if (sections.has(SectionKind.MAINTAINERS)) {
		await generateMaintainersSection(context);
	}

	if (sections.has(SectionKind.FAQ)) {
		await generateFaqSection(context);
	}

	if (sections.has(SectionKind.LICENSE)) {
		await generateLicenseSection(context);
	}

	if (sections.has(SectionKind.TOC)) {
		await generateTableOfContentsSection(context, false);
	}

	// Stringify the StringBuilder
	return options.prettier.format(context.str, {
		...options.config.prettier,
		parser: "markdown"
	});
}

/**
 * Sets the given content with the given content within the context
 *
 * @param context
 * @param sectionKind
 * @param content
 * @param [outro]
 */
function setSection(context: GenerateReadmeContext, sectionKind: SectionKind, content: string, outro?: string): void {
	const startMark = getShadowSectionMark(sectionKind, "start");
	const endMark = getShadowSectionMark(sectionKind, "end");
	const startMarkIndex = context.str.indexOf(startMark);
	const endMarkIndex = context.str.indexOf(endMark);
	const markedContent = startMark + "\n\n" + content + "\n\n" + endMark + "\n\n" + (outro == null ? "" : outro + "\n\n");

	if (startMarkIndex >= 0 && endMarkIndex >= 0) {
		const before = context.str.slice(0, startMarkIndex);
		const after = context.str.slice(endMarkIndex + endMark.length);
		context.str = before + markedContent + after;
	} else {
		context.str += markedContent;
	}
}

/**
 * Generates the logo section of the README
 *
 * @param context
 */
async function generateLogoSection(context: GenerateReadmeContext): Promise<void> {
	setSection(
		context,
		SectionKind.LOGO,
		// Don't proceed if there is no logo to generate an image for
		context.config.logo.url == null
			? ""
			: `<div>${formatImage({
					url: context.config.logo.url,
					alt: "Logo",
					height: context.config.logo.height
			  })}</div>`
	);
}

/**
 * Generates the feature image section of the README
 *
 * @param context
 */
async function generateFeatureImageSection(context: GenerateReadmeContext): Promise<void> {
	setSection(
		context,
		SectionKind.FEATURE_IMAGE,
		// Don't proceed if there is no feature image to generate an image for
		context.config.featureImage.url == null
			? ""
			: `<div>${formatImage({
					url: context.config.featureImage.url,
					alt: "Feature image",
					height: context.config.featureImage.height
			  })}</div><br>`
	);
}

/**
 * Generates the Table Of Contents section of the README
 *
 * @param context
 * @param [reserveOnly=false]
 */
async function generateTableOfContentsSection(context: GenerateReadmeContext, reserveOnly = false): Promise<void> {
	setSection(
		context,
		SectionKind.TOC,
		`## Table of Contents\n\n` +
			(reserveOnly
				? // Only reserve the spot within the README with an empty placeholder that can be replaced later on
				  ``
				: toc(context.str).content)
	);
}

/**
 * Generates the badges section of the README
 *
 * @param context
 */
async function generateBadgesSection(context: GenerateReadmeContext): Promise<void> {
	const badges = await getBadges(context);

	const content = Object.values(badges)
		.map(value => {
			if (value == null) return "";
			return value.join("");
		})
		.join("\n");
	setSection(context, SectionKind.BADGES, content);
}

/**
 * Generates the short description section of the README
 *
 * @param context
 */
async function generateDescriptionShortSection(context: GenerateReadmeContext): Promise<void> {
	// Don't proceed if the package has no description
	if (context.pkg.description == null) return;

	setSection(context, SectionKind.DESCRIPTION_SHORT, `> ${context.pkg.description}`);
}

/**
 * Generates the long description section of the README
 *
 * @param context
 */
async function generateDescriptionLongSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, SectionKind.DESCRIPTION_LONG, `## Description`);
}

/**
 * Generates the features section of the README
 *
 * @param context
 */
async function generateFeaturesSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, SectionKind.FEATURES, `### Features\n\n`);
}

/**
 * Generates the FAQ section of the README
 *
 * @param context
 */
async function generateFaqSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, SectionKind.FAQ, `## FAQ\n\n`);
}

/**
 * Generates the install section of the README
 *
 * @param context
 */
async function generateInstallSection(context: GenerateReadmeContext): Promise<void> {
	// Don't proceed if the package has no name
	if (context.pkg.name == null) return;
	const peerDependencies = context.pkg.peerDependencies == null ? [] : Object.keys(context.pkg.peerDependencies);
	const firstBinName = context.pkg.bin == null ? undefined : Object.keys(context.pkg.bin)[0];

	setSection(
		context,
		SectionKind.INSTALL,
		`## Install\n\n` +
			`### npm\n\n` +
			"```\n" +
			`$ npm install ${context.pkg.name}${context.config.isDevelopmentPackage ? ` --save-dev` : ``}\n` +
			"```\n\n" +
			`### Yarn\n\n` +
			"```\n" +
			`$ yarn add ${context.pkg.name}${context.config.isDevelopmentPackage ? ` --dev` : ``}\n` +
			"```\n\n" +
			`### pnpm\n\n` +
			"```\n" +
			`$ pnpm add ${context.pkg.name}${context.config.isDevelopmentPackage ? ` --save-dev` : ``}\n` +
			"```" +
			(firstBinName == null
				? ""
				: `\n\n` +
				  `### Run once with npx\n\n` +
				  "```\n" +
				  `$ npx${peerDependencies.length === 0 ? "" : peerDependencies.map(peerDependency => ` -p ${peerDependency}`).join("")}${
						firstBinName === context.pkg.name ? ` ${context.pkg.name}` : ` -p ${context.pkg.name} ${firstBinName}`
				  }\n` +
				  "```") +
			(peerDependencies.length < 1
				? ""
				: "\n\n" +
				  `### Peer Dependencies\n\n` +
				  `\`${context.pkg.name}\` depends on ${listFormat(peerDependencies, "and", element => `\`${element}\``)}, so you need to manually install ${
						peerDependencies.length === 1 ? "this" : "these"
				  }${context.config.isDevelopmentPackage ? ` as ${peerDependencies.length === 1 ? "a development dependency" : "development dependencies"}` : ``} as well.`)
	);
}

/**
 * Generates the usage section of the README
 *
 * @param context
 */
async function generateUsageSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, SectionKind.USAGE, `## Usage`);
}

/**
 * Generates the contributing section of the README
 *
 * @param context
 */
async function generateContributingSection(context: GenerateReadmeContext): Promise<void> {
	// Only add the contributing section if a CONTRIBUTING.md file exists
	const contributingFilePath = join(context.root, CONSTANT.codeOfConductFilename);

	setSection(
		context,
		SectionKind.CONTRIBUTING,
		!context.fs.existsSync(contributingFilePath)
			? ""
			: `## Contributing\n\n` + `Do you want to contribute? Awesome! Please follow [these recommendations](./${CONSTANT.contributingFilename}).`
	);
}

function generateContributorTable(contributors: Contributor[]): string {
	let str = "\n|";

	contributors.forEach(contributor => {
		const inner =
			contributor.imageUrl == null
				? undefined
				: formatImage({
						alt: contributor.name,
						url: contributor.imageUrl,
						height: CONSTANT.contributorImageUrlHeight
				  });

		const formattedImageWithUrl =
			inner == null
				? ""
				: contributor.email != null
				? formatUrl({url: `mailto:${contributor.email}`, inner})
				: contributor.url != null
				? formatUrl({url: contributor.url, inner})
				: inner;

		str += formattedImageWithUrl;
		str += "|";
	});
	str += "\n|";
	contributors.forEach(() => {
		str += "-----------|";
	});

	str += "\n|";

	contributors.forEach(contributor => {
		if (contributor.name != null) {
			if (contributor.email != null) {
				str += `[${contributor.name}](mailto:${contributor.email})`;
			} else if (contributor.url != null) {
				str += `[${contributor.name}](${contributor.url})`;
			} else {
				str += `${contributor.name}`;
			}
		}

		if (contributor.twitter != null) {
			str += `<br><strong>Twitter</strong>: [@${contributor.twitter}](https://twitter.com/${contributor.twitter})`;
		}

		if (contributor.github != null) {
			str += `<br><strong>Github</strong>: [@${contributor.github}](https://github.com/${contributor.github})`;
		}

		// Also add the role of the contributor, if available
		if (contributor.role != null) {
			str += `<br>_${contributor.role}_`;
		}
		str += "|";
	});

	return str;
}

/**
 * Generates the maintainers section of the README
 */
async function generateMaintainersSection(context: GenerateReadmeContext): Promise<void> {
	const contributors = getContributorsFromPackage(context.pkg);

	setSection(context, SectionKind.MAINTAINERS, contributors.length < 1 ? "" : `## Maintainers\n\n` + generateContributorTable(contributors));
}

function guessPreferredFundingUrlForOtherDonations(context: GenerateReadmeContext): string | undefined {
	// If a funding url is given, that should take precedence.
	if (context.config.donate.other.fundingUrl != null) {
		return context.config.donate.other.fundingUrl;
	}

	// Otherwise, it might be provided from a "funding" property in the package.json file
	if (context.pkg.funding != null) {
		if (typeof context.pkg.funding === "string") {
			return context.pkg.funding;
		} else if (context.pkg.funding.url != null) {
			return context.pkg.funding.url;
		}
	}

	// Otherwise, there's no way to know.
	return undefined;
}

/**
 * Generates the backers section of the README
 */
async function generateBackersSection(context: GenerateReadmeContext): Promise<void> {
	let content = "";

	if (context.config.donate.other.donors.length > 0) {
		const preferredFundingUrl = guessPreferredFundingUrlForOtherDonations(context);
		content +=
			(preferredFundingUrl != null ? `[Become a sponsor/backer](${preferredFundingUrl}) and get your logo listed here.\n\n` : "") +
			generateContributorTable(context.config.donate.other.donors) +
			"\n\n";
	}

	if (context.config.donate.openCollective.project != null) {
		content +=
			`### Open Collective\n\n` +
			`[Become a sponsor/backer](${CONSTANT.openCollectiveDonateUrl(context.config.donate.openCollective.project)}) and get your logo listed here.\n\n` +
			`#### Sponsors\n\n` +
			formatUrl({
				url: CONSTANT.openCollectiveContributorsUrl(context.config.donate.openCollective.project),
				inner: formatImage({
					url: CONSTANT.openCollectiveSponsorsBadgeUrl(context.config.donate.openCollective.project),
					alt: "Sponsors on Open Collective",
					width: 500
				})
			}) +
			"\n\n" +
			`#### Backers\n\n` +
			formatUrl({
				url: CONSTANT.openCollectiveContributorsUrl(context.config.donate.openCollective.project),
				inner: formatImage({
					url: CONSTANT.openCollectiveBackersBadgeUrl(context.config.donate.openCollective.project),
					alt: "Backers on Open Collective"
				})
			}) +
			"\n\n";
	}

	if (context.config.donate.patreon.userId != null && context.config.donate.patreon.username != null) {
		content +=
			`### Patreon\n\n` +
			formatUrl({
				url: CONSTANT.patreonDonateUrl(context.config.donate.patreon.userId),
				inner: formatImage({
					url: CONSTANT.patreonBadgeUrl(context.config.donate.patreon.username),
					alt: "Patrons on Patreon",
					width: 200
				})
			}) +
			"\n\n";
	}

	setSection(context, SectionKind.BACKERS, context.config.donate.patreon.userId == null && context.config.donate.openCollective.project == null ? "" : `## Backers\n\n` + content);
}

/**
 * Generates the license section of the README
 *
 * @param context
 */
async function generateLicenseSection(context: GenerateReadmeContext): Promise<void> {
	const license = await findLicense(context);
	const contributors = getContributorsFromPackage(context.pkg);
	const licenseFilePath = join(context.root, CONSTANT.licenseFilename);

	setSection(
		context,
		SectionKind.LICENSE,
		license == null || !context.fs.existsSync(licenseFilePath)
			? ""
			: `## License\n\n` +
					`${license} © ${listFormat(
						contributors.map(contributor => formatContributor(contributor, "markdown")),
						"and"
					)}`
	);
}
