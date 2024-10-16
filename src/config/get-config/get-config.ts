/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type {FindConfigOptions} from "../find-config/find-config-options.js";
import type {SandhogConfig} from "../sandhog-config.js";
import {findConfig} from "../find-config/find-config.js";
import {DEFAULT_SANDHOG_CONFIG} from "../default-sandhog-config.js";
import type {BadgeKind} from "../../badge/badge-kind.js";
import type {SectionKind} from "../../section/section-kind.js";
import type {Options} from "prettier";
import type {Contributor} from "../../contributor/contributor.js";

/**
 * Gets a SandhogConfig. Will attempt to resolve a config and fall back to defaults
 * if no such config could be found
 */
export async function getConfig(options: FindConfigOptions): Promise<SandhogConfig> {
	// Resolve the config
	let config = await findConfig(options);
	// If no config could be found, initialize to an empty record
	if (config == null) {
		config = {};
	}

	const defaultConfig = await DEFAULT_SANDHOG_CONFIG;

	return {
		isDevelopmentPackage: config.isDevelopmentPackage ?? defaultConfig.isDevelopmentPackage,
		logo: {
			height: config.logo?.height ?? defaultConfig.logo.height,
			url: config.logo?.url ?? defaultConfig.logo.url
		},
		featureImage: {
			height: config.featureImage?.height ?? defaultConfig.featureImage.height,
			url: config.featureImage?.url ?? defaultConfig.featureImage.url
		},
		prettier: (config.prettier as Options | undefined) ?? defaultConfig.prettier,
		donate: {
			other: {
				donors: (config.donate?.other?.donors as Contributor[] | undefined) ?? defaultConfig.donate.other.donors
			},
			patreon: {
				username: config.donate?.patreon?.username ?? defaultConfig.donate.patreon.username,
				userId: config.donate?.patreon?.userId ?? defaultConfig.donate.patreon.userId
			},
			openCollective: {
				project: config.donate?.openCollective?.project ?? defaultConfig.donate.openCollective.project
			}
		},
		readme: {
			badges: {
				exclude: (config.readme?.badges?.exclude as Iterable<BadgeKind>) ?? defaultConfig.readme.badges.exclude
			},
			sections: {
				exclude: (config.readme?.sections?.exclude as Iterable<SectionKind>) ?? defaultConfig.readme.sections.exclude
			}
		}
	};
}
