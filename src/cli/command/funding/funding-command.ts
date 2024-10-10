import type {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {CONSTANT} from "../../../constant/constant.js";

export function createFundingCommand(program: Command) {
	return createCommand(
		program,
		{
			name: "funding",
			description: `Generates a ${CONSTANT.fundingFilename} file`,
			args: {},
			options: {
				...SHARED_OPTIONS
			}
		},
		async args => {
			// Load the task
			const {fundingTask} = await import("../../task/funding/funding-task.js");
			// Execute it
			fundingTask({
				...(await generateTaskOptions(args))
			});
		}
	);
}
