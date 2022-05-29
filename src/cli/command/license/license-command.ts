import {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {CONSTANT} from "../../../constant/constant.js";
import {isKnownLicenseName} from "../../../license/is-known-license-name.js";
import {getLicense} from "../../../license/get-license/get-license.js";

export function createLicenseCommand(program: Command) {
	return createCommand(
		program,
		{
			name: "license",
			description: `Generates a ${CONSTANT.licenseFilename} file`,
			args: {},
			options: {
				...SHARED_OPTIONS,
				license: {
					description: "Override the license to use generate",
					type: "string",
					shortHand: "l"
				}
			}
		},
		async args => {
			// Load the task
			const {licenseTask} = await import("../../task/license/license-task.js");

			// Prepare base options
			const taskOptions = await generateTaskOptions(args);

			// Detect the license. It may be given/overridden from a CLI option
			const license = await (async () => {
				if (args.license != null) {
					if (!isKnownLicenseName(args.license)) {
						throw new TypeError(`The license: '${args.license}' given via a CLI option is not supported`);
					}
					taskOptions.logger.debug(`License given as a CLI option: '${args.license}'`);
					return args.license;
				}

				// Otherwise, try to resolve it
				else {
					return await getLicense(taskOptions);
				}
			})();

			// Execute the task
			licenseTask({
				...taskOptions,
				license
			});
		}
	);
}
