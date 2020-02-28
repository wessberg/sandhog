import {TaskOptions} from "../task-options";
import {getConfig} from "../../..";
import {Logger} from "../../../logger/logger";
import {SanitizedSharedOptions} from "./sanitized-shared-options";
import {selectLogLevel} from "./select-log-level/select-log-level";
import {findPackage} from "../../../package/find-package/find-package";
import prettier from "prettier";
import fs from "fs";
import {LogLevel} from "../../../logger/log-level";

/**
 * Generates the task options that are shared across all commands
 *
 * @param options
 * @returns
 */
export async function generateTaskOptions(options: SanitizedSharedOptions): Promise<TaskOptions> {
	// Prepare a logger
	const logLevel = selectLogLevel(options);
	const logger = new Logger(logLevel);

	// Inform about the log level (if applicable)
	if (logLevel === LogLevel.VERBOSE) logger.verbose(`Logging mode: VERBOSE`);
	else if (logLevel === LogLevel.DEBUG) logger.debug(`Logging mode: DEBUG`);

	// Resolve the package.json file
	const {pkg, root} = await findPackage({
		logger
	});

	// Normalize the config
	const config = await getConfig({
		root,
		pkg,
		filename: options.config,
		logger
	});

	return {
		fs,
		pkg,
		config,
		logger,
		prettier,
		root,
		yes: options.yes === true
	};
}
