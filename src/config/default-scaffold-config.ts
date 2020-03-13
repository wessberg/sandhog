import {ScaffoldConfig} from "./scaffold-config";
import {Options, resolveConfig} from "prettier";

/**
 * This object holds all of the default config options for a ScaffoldConfig
 * @type {Promise<ScaffoldConfig>}
 */
export const DEFAULT_SCAFFOLD_CONFIG: Promise<ScaffoldConfig> = (async () => ({
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
			const prettierConfig = await resolveConfig(process.cwd());
			if (prettierConfig != null) {
				return prettierConfig;
			}
			return defaultConfig;
		} catch {
			return defaultConfig;
		}
	})()
}))();
