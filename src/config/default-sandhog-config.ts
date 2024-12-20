import type {SandhogConfig} from "./sandhog-config.js";
import prettier, {type Options} from "prettier";

/**
 * This object holds all of the default config options for a SandhogConfig
 * @type {Promise<SandhogConfig>}
 */
export const DEFAULT_SANDHOG_CONFIG: Promise<SandhogConfig> = (async () => ({
	isDevelopmentPackage: false,
	logo: {
		height: 80
	},
	featureImage: {
		height: 180
	},
	donate: {
		other: {
			donors: []
		},
		patreon: {},
		openCollective: {}
	},
	readme: {
		badges: {
			exclude: []
		},
		sections: {
			exclude: []
		}
	},
	prettier: await (async () => {
		const defaultConfig = {
			// Tabs don't print well in Github Flavored Markdown Syntax highlighting
			useTabs: false,
			semi: true,
			tabWidth: 2,
			singleQuote: false,
			trailingComma: "none",
			bracketSpacing: false,
			printWidth: 90,
			arrowParens: "avoid"
		} as Options;

		// resolveConfig may throw, so wrap it in a try-catch
		try {
			const prettierConfig = await prettier.resolveConfig(process.cwd());
			if (prettierConfig != null) {
				return prettierConfig;
			}
			return defaultConfig;
		} catch {
			return defaultConfig;
		}
	})()
}))();
