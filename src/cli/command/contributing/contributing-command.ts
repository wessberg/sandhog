import {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {CONSTANT} from "../../../constant/constant.js";

export function createContributingCommand(program: Command) {
	return createCommand(
		program,
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
			const {contributingTask} = await import("../../task/contributing/contributing-task.js");
			// Execute it
			contributingTask({
				...(await generateTaskOptions(args))
			});
		}
	);
}
