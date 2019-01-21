import {IFormatter} from "./i-formatter";
import {format, Options, resolveConfig} from "prettier";

/**
 * A Service that can format source text
 */
export class Formatter implements IFormatter {
	/**
	 * Formats the given source based on the given options
	 * @param {string} source
	 * @param {Options} options
	 */
	public async format(source: string, options?: Options): Promise<string> {
		// Resolve the closest prettier config on the disk from the current working directory - and preferably use that one
		const config = await resolveConfig(process.cwd());
		console.log(config);
		const normalizedConfig = config == null ? {} : config;

		return format(source, {
			...options,
			...normalizedConfig
		});
	}
}
