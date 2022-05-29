import {TaskOptions} from "../task-options.js";
import {Logger} from "../../../logger/logger.js";
import {SanitizedSharedOptions} from "./sanitized-shared-options.js";
import {selectLogLevel} from "./select-log-level/select-log-level.js";
import {findPackage} from "../../../package/find-package/find-package.js";
import prettier from "prettier";
import fs from "fs";
import {LogLevelKind} from "../../../logger/log-level-kind.js";
import { getConfig } from "../../../config/get-config/get-config.js";

/**
 * Generates the task options that are shared across all commands
 */
export async function generateTaskOptions(options: SanitizedSharedOptions): Promise<TaskOptions> {
	// Prepare a logger
	const logLevel = selectLogLevel(options);
	const logger = new Logger(logLevel);

	// Inform about the log level (if applicable)
	if (logLevel === LogLevelKind.VERBOSE) logger.verbose(`Logging mode: VERBOSE`);
	else if (logLevel === LogLevelKind.DEBUG) logger.debug(`Logging mode: DEBUG`);

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
