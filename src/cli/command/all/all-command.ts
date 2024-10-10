import type {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {getLicense} from "../../../license/get-license/get-license.js";

export function createAllCommand(program: Command) {
	return createCommand(
		program,
		{
			name: "all",
			description: `Generates all of the files sandhog supports in one command`,
			args: {},
			options: {
				...SHARED_OPTIONS
			}
		},
		async args => {
			// Load the task
			const {cocTask} = await import("../../task/coc/coc-task.js");
			const {contributingTask} = await import("../../task/contributing/contributing-task.js");
			const {fundingTask} = await import("../../task/funding/funding-task.js");
			const {licenseTask} = await import("../../task/license/license-task.js");
			const {readmeTask} = await import("../../task/readme/readme-task.js");

			// Prepare base options
			const taskOptions = await generateTaskOptions(args);

			// Execute it
			cocTask({
				...taskOptions
			});

			contributingTask({
				...taskOptions
			});

			fundingTask({
				...taskOptions
			});

			licenseTask({
				...taskOptions,
				license: await getLicense(taskOptions)
			});

			readmeTask({
				...taskOptions
			});
		}
	);
}
