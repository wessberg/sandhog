import {createCommand} from "../create-command/create-command";
import {SHARED_OPTIONS} from "../shared/shared-options";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options";
import {CONSTANT} from "../../../constant/constant";

createCommand(
	{
		name: "coc",
		description: `Generates a ${CONSTANT.codeOfConductFilename} file`,
		args: {},
		options: {
			...SHARED_OPTIONS
		}
	},
	async args => {
		// Load the task
		const {cocTask} = await import("../../task/coc/coc-task");
		// Execute it
		cocTask({
			...(await generateTaskOptions(args))
		});
	}
);
