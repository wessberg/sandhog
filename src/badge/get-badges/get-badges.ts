/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type {GetBadgesOptions} from "./get-badges-options.js";
import type {GetBadgesResult} from "./get-badges-result.js";
import {findCodeStyles} from "../../code-style/find-code-style/find-code-styles.js";
import {CONSTANT} from "../../constant/constant.js";
import {formatUrl} from "../../markdown/format-url/format-url.js";
import {formatImage} from "../../markdown/format-image/format-image.js";
import {takeGithubRepositoryName} from "../../package/take-github-repository-name/take-github-repository-name.js";
import {findLicense} from "../../license/find-license/find-license.js";
import {getLicenseForLicenseName} from "../../license/get-license-for-license-name/get-license-for-license-name.js";

/**
 * Gets relevant badges based on the given options
 */
export async function getBadges(options: GetBadgesOptions): Promise<GetBadgesResult> {
	const result: GetBadgesResult = {};
	const badgeOptions = options.config.readme.badges;
	const excluded = new Set(badgeOptions.exclude);

	const encodedName = options.pkg.name == null ? undefined : encodeURIComponent(options.pkg.name);
	const repoUrl = takeGithubRepositoryName(options.pkg);
	const encodedRepoUrl = repoUrl == null ? undefined : encodeURIComponent(repoUrl);

	// Unless explicitly excluded, and if possible, generate a badge for the amount of downloads for the project
	if (!excluded.has("downloads") && encodedName != null) {
		result.downloads = [
			formatUrl({
				url: `https://npmcharts.com/compare/${encodedName}?minimal=true`,
				inner: formatImage({
					alt: "Downloads per month",
					url: `https://img.shields.io/npm/dm/${encodedName}.svg`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for the NPM version
	if (!excluded.has("npm") && encodedName != null) {
		result.npm = [
			formatUrl({
				url: `https://www.npmjs.com/package/${encodedName}`,
				inner: formatImage({
					url: `https://badge.fury.io/js/${encodedName}.svg`,
					alt: `NPM version`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for the package dependencies
	if (!excluded.has("dependencies") && repoUrl != null && encodedRepoUrl != null) {
		result.dependencies = [
			formatImage({
				alt: `Dependencies`,
				url: `https://img.shields.io/librariesio/github/${encodedRepoUrl}.svg`
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for the package dependencies
	if (!excluded.has("contributors") && encodedName != null && repoUrl != null && encodedRepoUrl != null) {
		result.contributors = [
			formatUrl({
				url: `https://github.com/${repoUrl}/graphs/contributors`,
				inner: formatImage({
					alt: `Contributors`,
					url: `https://img.shields.io/github/contributors/${encodedRepoUrl}.svg`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for the project code style(s).
	if (!excluded.has("code_style")) {
		const codeStyles = await findCodeStyles(options);
		if (codeStyles.length > 0) {
			result.code_style = codeStyles.map(({kind, url, badgeUrl}) =>
				formatUrl({
					url,
					inner: formatImage({
						alt: `code style: ${kind}`,
						url: badgeUrl
					})
				})
			);
		}
	}

	// Unless explicitly excluded, and if possible, generate a badge for the project license
	if (!excluded.has("license")) {
		const licenseName = await findLicense(options);
		if (licenseName != null) {
			const {badgeUrl, url} = getLicenseForLicenseName(licenseName);
			result.license = [
				formatUrl({
					url,
					inner: formatImage({
						alt: `License: ${licenseName}`,
						url: badgeUrl
					})
				})
			];
		}
	}

	// Unless explicitly excluded, and if possible, generate a badge for supporting on Patreon
	if (!excluded.has("patreon") && options.config.donate?.patreon?.userId != null) {
		result.patreon = [
			formatUrl({
				url: CONSTANT.patreonDonateUrl(options.config.donate.patreon.userId),
				inner: formatImage({
					alt: `Support on Patreon`,
					url: `https://img.shields.io/badge/patreon-donate-green.svg`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for supporting on Open Collective
	if (!excluded.has("open_collective_donate") && options.config.donate?.openCollective?.project != null) {
		result.open_collective_donate = [
			formatUrl({
				url: CONSTANT.openCollectiveDonateUrl(options.config.donate.openCollective.project),
				inner: formatImage({
					alt: `Support on Open Collective`,
					url: `https://img.shields.io/badge/opencollective-donate-green.svg`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for listing the amount of backers on Open Collective
	if (!excluded.has("open_collective_backers") && options.config.donate?.openCollective?.project != null) {
		result.open_collective_backers = [
			formatUrl({
				url: CONSTANT.openCollectiveContributorsUrl(options.config.donate.openCollective.project),
				inner: formatImage({
					alt: `Backers on Open Collective`,
					url: `https://opencollective.com/${options.config.donate.openCollective.project}/backers/badge.svg`
				})
			})
		];
	}

	// Unless explicitly excluded, and if possible, generate a badge for listing the amount of sponsors on Open Collective
	if (!excluded.has("open_collective_sponsors") && options.config.donate?.openCollective?.project != null) {
		result.open_collective_sponsors = [
			formatUrl({
				url: CONSTANT.openCollectiveContributorsUrl(options.config.donate.openCollective.project),
				inner: formatImage({
					alt: `Sponsors on Open Collective`,
					url: `https://opencollective.com/${options.config.donate.openCollective.project}/sponsors/badge.svg`
				})
			})
		];
	}

	return result;
}
