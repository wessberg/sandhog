import {GenerateReadmeOptions} from "./generate-readme-options.js";
import {SectionKind} from "../../section/section-kind.js";
import {GenerateReadmeContext} from "./generate-readme-context.js";
import {getBadges} from "../../badge/get-badges/get-badges.js";
import {getRelevantSections} from "../../section/get-relevant-sections/get-relevant-sections.js";
import {formatImage} from "../../markdown/format-image/format-image.js";
import {getShadowSectionMark} from "../get-shadow-section-mark/get-shadow-section-mark.js";
import {getContributorsFromPackage} from "../../contributor/get-contributors-from-package.js";
import {CONSTANT} from "../../constant/constant.js";
import {findLicense} from "../../license/find-license/find-license.js";
import {formatContributor} from "../../contributor/format-contributor.js";
import {listFormat} from "../../util/list-format/list-format.js";
import {formatUrl} from "../../markdown/format-url/format-url.js";
import toc from "markdown-toc";
import path from "crosspath";
import {Contributor} from "../../contributor/contributor.js";

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

	if (sections.has("logo")) {
		await generateLogoSection(context);
	}

	if (sections.has("description_short")) {
		await generateDescriptionShortSection(context);
	}

	if (sections.has("badges")) {
		await generateBadgesSection(context);
	}

	if (sections.has("description_long")) {
		await generateDescriptionLongSection(context);
	}

	if (sections.has("features")) {
		await generateFeaturesSection(context);
	}

	if (sections.has("feature_image")) {
		await generateFeatureImageSection(context);
	}

	if (sections.has("backers")) {
		await generateBackersSection(context);
	}

	if (sections.has("toc")) {
		await generateTableOfContentsSection(context, true);
	}

	if (sections.has("install")) {
		await generateInstallSection(context);
	}

	if (sections.has("usage")) {
		await generateUsageSection(context);
	}

	if (sections.has("contributing")) {
		await generateContributingSection(context);
	}

	if (sections.has("maintainers")) {
		await generateMaintainersSection(context);
	}

	if (sections.has("faq")) {
		await generateFaqSection(context);
	}

	if (sections.has("license")) {
		await generateLicenseSection(context);
	}

	if (sections.has("toc")) {
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
		"logo",
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
 */
async function generateFeatureImageSection(context: GenerateReadmeContext): Promise<void> {
	setSection(
		context,
		"feature_image",
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
 */
async function generateTableOfContentsSection(context: GenerateReadmeContext, reserveOnly = false): Promise<void> {
	setSection(
		context,
		"toc",
		`## Table of Contents\n\n` +
			(reserveOnly
				? // Only reserve the spot within the README with an empty placeholder that can be replaced later on
				  ``
				: toc(context.str).content)
	);
}

/**
 * Generates the badges section of the README
 */
async function generateBadgesSection(context: GenerateReadmeContext): Promise<void> {
	const badges = await getBadges(context);

	const content = Object.values(badges)
		.map(value => {
			if (value == null) return "";
			return value.join("\n");
		})
		.join("\n");
	setSection(context, "badges", content);
}

/**
 * Generates the short description section of the README
 */
async function generateDescriptionShortSection(context: GenerateReadmeContext): Promise<void> {
	// Don't proceed if the package has no description
	if (context.pkg.description == null) return;

	setSection(context, "description_short", `> ${context.pkg.description}`);
}

/**
 * Generates the long description section of the README
 */
async function generateDescriptionLongSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, "description_long", `## Description`);
}

/**
 * Generates the features section of the README
 */
async function generateFeaturesSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, "features", `### Features\n\n`);
}

/**
 * Generates the FAQ section of the README
 */
async function generateFaqSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, "faq", `## FAQ\n\n`);
}

function generateNpxStep(binName: string, requiredPeerDependencies: string[], context: GenerateReadmeContext): string {
	const canUseShorthand = binName === context.pkg.name;
	const simpleCommand = "```\n" + `$ npx ${canUseShorthand ? `${context.pkg.name}` : `-p ${context.pkg.name} ${binName}`}\n` + "```";

	if (requiredPeerDependencies.length < 1) {
		return simpleCommand;
	} else if (canUseShorthand) {
		return (
			`First, add ${requiredPeerDependencies.length === 1 ? "the peer dependency" : "the peer dependencies"} ${listFormat(
				requiredPeerDependencies,
				"and",
				element => `\`${element}\``
			)} as${requiredPeerDependencies.length === 1 ? " a" : ""}${context.config.isDevelopmentPackage ? " development " : ""}${
				requiredPeerDependencies.length === 1 ? " dependency" : "dependencies"
			} to the package from which you're going to run \`${binName}\`. Alternatively, if you want to run it from _anywhere_, you can also install ${
				requiredPeerDependencies.length === 1 ? "it" : "them"
			} globally: \`npm i -g ${requiredPeerDependencies.join(" ")}\`. Now, you can simply run:\n` +
			simpleCommand +
			"\n" +
			`You can also run \`${binName}\` along with its peer dependencies in one combined command:\n` +
			"```\n" +
			`$ npx${requiredPeerDependencies.map(requiredPeerDependency => ` -p ${requiredPeerDependency}`).join("")} -p ${context.pkg.name} ${binName}\n` +
			"```\n"
		);
	} else {
		return "```\n" + `$ npx${requiredPeerDependencies.map(requiredPeerDependency => ` -p ${requiredPeerDependency}`).join("")} -p ${context.pkg.name} ${binName}\n` + "```\n";
	}
}

/**
 * Generates the install section of the README
 */
async function generateInstallSection(context: GenerateReadmeContext): Promise<void> {
	// Don't proceed if the package has no name
	if (context.pkg.name == null) return;
	const peerDependencies =
		context.pkg.peerDependencies == null
			? []
			: Object.keys(context.pkg.peerDependencies).map(peerDependency => ({
					peerDependency,
					optional: Boolean(context.pkg.peerDependenciesMeta?.[peerDependency]?.optional)
			  }));

	const requiredPeerDependencies = peerDependencies.filter(({optional}) => !optional).map(({peerDependency}) => peerDependency);
	const optionalPeerDependencies = peerDependencies.filter(({optional}) => optional).map(({peerDependency}) => peerDependency);

	const firstBinName = context.pkg.bin == null ? undefined : Object.keys(context.pkg.bin)[0];

	setSection(
		context,
		"install",
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
			(firstBinName == null ? "" : `\n\n` + `### Run once with npx\n\n` + generateNpxStep(firstBinName, requiredPeerDependencies, context)) +
			(peerDependencies.length < 1
				? ""
				: "\n\n" +
				  `### Peer Dependencies\n\n` +
				  (requiredPeerDependencies.length < 1
						? ""
						: `\`${context.pkg.name}\` depends on ${listFormat(requiredPeerDependencies, "and", element => `\`${element}\``)}, so you need to manually install ${
								requiredPeerDependencies.length === 1 ? "this" : "these"
						  }${context.config.isDevelopmentPackage ? ` as ${requiredPeerDependencies.length === 1 ? "a development dependency" : "development dependencies"}` : ``} as well.`) +
				  (optionalPeerDependencies.length < 1
						? ""
						: (requiredPeerDependencies.length < 1 ? `You may` : `\n\nYou may also`) +
						  ` need to install ${
								optionalPeerDependencies.length < 2
									? `\`${optionalPeerDependencies[0]}\``
									: `${requiredPeerDependencies.length < 1 ? "" : "additional "}peer dependencies such as ${listFormat(
											optionalPeerDependencies,
											"or",
											element => `\`${element}\``
									  )}`
						  } depending on the features you are going to use. Refer to the documentation for the specific cases where ${
								optionalPeerDependencies.length < 2 ? "it" : "any of these"
						  } may be relevant.`))
	);
}

/**
 * Generates the usage section of the README
 */
async function generateUsageSection(context: GenerateReadmeContext): Promise<void> {
	setSection(context, "usage", `## Usage`);
}

/**
 * Generates the contributing section of the README
 */
async function generateContributingSection(context: GenerateReadmeContext): Promise<void> {
	// Only add the contributing section if a CONTRIBUTING.md file exists
	const contributingFilePath = path.join(context.root, CONSTANT.codeOfConductFilename);
	const nativeContributingFilePath = path.native.normalize(contributingFilePath);

	setSection(
		context,
		"contributing",
		!context.fs.existsSync(nativeContributingFilePath)
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

	setSection(context, "maintainers", contributors.length < 1 ? "" : `## Maintainers\n\n` + generateContributorTable(contributors));
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

	setSection(context, "backers", context.config.donate.patreon.userId == null && context.config.donate.openCollective.project == null ? "" : `## Backers\n\n` + content);
}

/**
 */
async function generateLicenseSection(context: GenerateReadmeContext): Promise<void> {
	const license = await findLicense(context);
	const contributors = getContributorsFromPackage(context.pkg);
	const licenseFilePath = path.join(context.root, CONSTANT.licenseFilename);
	const nativeLicenseFilePath = path.native.normalize(licenseFilePath);

	setSection(
		context,
		"license",
		license == null || !context.fs.existsSync(nativeLicenseFilePath)
			? ""
			: `## License\n\n` +
					`${license} © ${listFormat(
						contributors.map(contributor => formatContributor(contributor, "markdown")),
						"and"
					)}`
	);
}
