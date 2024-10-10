import type {ContributingTaskOptions} from "./contributing-task-options.js";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package.js";
import path from "crosspath";
import {CONSTANT} from "../../../constant/constant.js";
import {generateContributing} from "../../../contributing/generate-contributing/generate-contributing.js";
import {confirm} from "../../../util/prompt/confirm.js";

/**
 * Executes the 'coc' task
 */
export async function contributingTask({pkg, logger, prettier, config, root, fs, yes}: ContributingTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const contributingText = await generateContributing({contributors, config, prettier, pkg});
	const pathFromRoot = path.join(root, CONSTANT.contributingFilename);
	const nativePath = path.native.normalize(pathFromRoot);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(nativePath) ||
		fs.readFileSync(nativePath, "utf8") === contributingText ||
		(await confirm(`A ${CONSTANT.contributingFilename} file already exists at path: ${nativePath}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the CONTRIBUTING.md to disk
		logger.info(`Writing '${nativePath}'`);
		fs.writeFileSync(nativePath, contributingText);
	}
}
