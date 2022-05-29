import {CocTaskOptions} from "./coc-task-options.js";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package.js";
import {generateCoc} from "../../../coc/generate-coc/generate-coc.js";
import path from "crosspath";
import {CONSTANT} from "../../../constant/constant.js";
import {confirm} from "../../../util/prompt/confirm.js";

/**
 * Executes the 'coc' task
 */
export async function cocTask({pkg, logger, prettier, config, root, fs, yes}: CocTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const cocText = generateCoc({contributors, config, prettier});
	const pathFromRoot = path.join(root, CONSTANT.codeOfConductFilename);
	const nativePath = path.native.normalize(pathFromRoot);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(nativePath) ||
		fs.readFileSync(nativePath, "utf8") === cocText ||
		(await confirm(`A ${CONSTANT.codeOfConductFilename} file already exists at path: ${nativePath}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the CODE_OF_CONDUCT.md to disk
		logger.info(`Writing '${nativePath}'`);
		fs.writeFileSync(nativePath, cocText);
	}
}
