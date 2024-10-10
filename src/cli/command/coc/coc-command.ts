import type {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {CONSTANT} from "../../../constant/constant.js";

export function createCocCommand(program: Command) {
	return createCommand(
		program,
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
			const {cocTask} = await import("../../task/coc/coc-task.js");
			// Execute it
			cocTask({
				...(await generateTaskOptions(args))
			});
		}
	);
}
