import {FindConfigOptions} from "../find-config/find-config-options";
import {ScaffoldConfig} from "../scaffold-config";
import {findConfig} from "../find-config/find-config";
import {DEFAULT_SCAFFOLD_CONFIG} from "../default-scaffold-config";
import {BadgeKind} from "../../badge/badge-kind";
import {SectionKind} from "../../section/section-kind";
import {Options} from "prettier";
import {Contributor} from "../../contributor/contributor";

/**
 * Gets a ScaffoldConfig. Will attempt to resolve a config and fall back to defaults
 * if no such config could be found
 *
 * @type {FindConfigOptions} options
 * @returns
 */
export async function getConfig(options: FindConfigOptions): Promise<ScaffoldConfig> {
	// Resolve the config
	let config = await findConfig(options);
	// If no config could be found, initialize to an empty record
	if (config == null) {
		config = {};
	}

	const defaultConfig = await DEFAULT_SCAFFOLD_CONFIG;

	return {
		logo: {
			height: config.logo == null || config.logo.height == null ? defaultConfig.logo.height : config.logo.height,
			url: config.logo == null || config.logo.url == null ? defaultConfig.logo.url : config.logo.url
		},
		featureImage: {
			height: config.featureImage == null || config.featureImage.height == null ? defaultConfig.featureImage.height : config.featureImage.height,
			url: config.featureImage == null || config.featureImage.url == null ? defaultConfig.featureImage.url : config.featureImage.url
		},
		prettier: config.prettier == null ? defaultConfig.prettier : (config.prettier as Options),
		donate: {
			other: {
				donors:
					config.donate == null || config.donate.other == null || config.donate.other.donors == null
						? defaultConfig.donate.other.donors
						: (config.donate.other.donors as Contributor[])
			},
			patreon: {
				username:
					config.donate == null || config.donate.patreon == null || config.donate.patreon.username == null
						? defaultConfig.donate.patreon.username
						: config.donate.patreon.username,
				userId:
					config.donate == null || config.donate.patreon == null || config.donate.patreon.userId == null
						? defaultConfig.donate.patreon.userId
						: config.donate.patreon.userId
			},
			openCollective: {
				project:
					config.donate == null || config.donate.openCollective == null || config.donate.openCollective.project == null
						? defaultConfig.donate.openCollective.project
						: config.donate.openCollective.project
			}
		},
		readme: {
			badges: {
				exclude:
					config.readme == null || config.readme.badges == null || config.readme.badges.exclude == null
						? defaultConfig.readme.badges.exclude
						: (config.readme.badges.exclude as Iterable<BadgeKind>)
			},
			sections: {
				exclude:
					config.readme == null || config.readme.sections == null || config.readme.sections.exclude == null
						? defaultConfig.readme.sections.exclude
						: (config.readme.sections.exclude as Iterable<SectionKind>)
			}
		}
	};
}
