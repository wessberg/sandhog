import {createCommand} from "../create-command/create-command";
import {SHARED_OPTIONS} from "../shared/shared-options";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options";
import {CONSTANT} from "../../../constant/constant";

createCommand(
	{
		name: "contributing",
		description: `Generates a ${CONSTANT.contributingFilename} file`,
		args: {},
		options: {
			...SHARED_OPTIONS
		}
	},
	async args => {
		// Load the task
		const {contributingTask} = await import("../../task/contributing/contributing-task");
		// Execute it
		contributingTask({
			...(await generateTaskOptions(args))
		});
	}
);
