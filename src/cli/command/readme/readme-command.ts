/* eslint-disable @typescript-eslint/naming-convention */
import type {Command} from "commander";
import {createCommand} from "../create-command/create-command.js";
import {SHARED_OPTIONS} from "../shared/shared-options.js";
import {generateTaskOptions} from "../../task/generate-task-options/generate-task-options.js";
import {CONSTANT} from "../../../constant/constant.js";
import {ensureSectionKind} from "../../../section/ensure-section-kind/ensure-section-kind.js";
import {ensureBadgeKind} from "../../../badge/ensure-badge-kind/ensure-badge-kind.js";

export function createReadmeCommand(program: Command) {
	return createCommand(
		program,
		{
			name: "readme",
			description: `Generates a ${CONSTANT.readmeFilename} file`,
			args: {},
			options: {
				...SHARED_OPTIONS,
				"section.exclude": {
					description: `The comma-separated sections to exclude from the generated ${CONSTANT.readmeFilename}`,
					type: "string"
				},
				"badge.exclude": {
					description: `The comma-separated badges to exclude from the generated ${CONSTANT.readmeFilename}`,
					type: "string"
				}
			}
		},
		async args => {
			// Load the task
			const {readmeTask} = await import("../../task/readme/readme-task.js");

			// Prepare base options
			const taskOptions = await generateTaskOptions(args);

			// If given via the command line, update the excluded sections
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (args["section.exclude"] != null) {
				const splitted = args["section.exclude"].split(",");

				// Validate all of the given strings and update them on the options
				taskOptions.config.readme.sections.exclude = splitted.map(ensureSectionKind);
			}

			// If given via the command line, update the excluded badges
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if (args["badge.exclude"] != null) {
				const splitted = args["badge.exclude"].split(",");

				// Validate all of the given strings and update them on the options
				taskOptions.config.readme.badges.exclude = splitted.map(ensureBadgeKind);
			}

			// Execute the task
			readmeTask({
				...taskOptions
			});
		}
	);
}
