import {ContributingTaskOptions} from "./contributing-task-options";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package";
import {join} from "path";
import {CONSTANT} from "../../../constant/constant";
import {generateContributing} from "../../../contributing/generate-contributing/generate-contributing";
import {confirm} from "../../../util/prompt/confirm";

/**
 * Executes the 'coc' task
 *
 * @param options
 * @returns
 */
export async function contributingTask({pkg, logger, prettier, config, root, fs, yes}: ContributingTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const contributingText = generateContributing({contributors, config, prettier, pkg});
	const path = join(root, CONSTANT.CONTRIBUTING_FILENAME);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(path) ||
		fs.readFileSync(path, "utf8") === contributingText ||
		(await confirm(`A ${CONSTANT.CONTRIBUTING_FILENAME} file already exists at path: ${path}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the CONTRIBUTING.md to disk
		logger.info(`Writing '${path}'`);
		fs.writeFileSync(path, contributingText);
	}
}
