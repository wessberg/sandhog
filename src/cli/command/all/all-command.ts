import {createCommand} from "../create-command/create-command";
import {SHARED_OPTIONS} from "../shared/shared-options";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options";
import {getLicense} from "../../../license/get-license/get-license";

createCommand(
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
		const {cocTask} = await import("../../task/coc/coc-task");
		const {contributingTask} = await import("../../task/contributing/contributing-task");
		const {fundingTask} = await import("../../task/funding/funding-task");
		const {licenseTask} = await import("../../task/license/license-task");
		const {readmeTask} = await import("../../task/readme/readme-task");

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
