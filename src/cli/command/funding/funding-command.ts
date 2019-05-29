import {createCommand} from "../create-command/create-command";
import {SHARED_OPTIONS} from "../shared/shared-options";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options";
import {CONSTANT} from "../../../constant/constant";

createCommand(
	{
		name: "funding",
		description: `Generates a ${CONSTANT.FUNDING_FILENAME} file`,
		args: {},
		options: {
			...SHARED_OPTIONS
		}
	},
	async args => {
		// Load the task
		const {fundingTask} = await import("../../task/funding/funding-task");
		// Execute it
		fundingTask({
			...(await generateTaskOptions(args))
		});
	}
);
