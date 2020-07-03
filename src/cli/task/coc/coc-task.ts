import {CocTaskOptions} from "./coc-task-options";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package";
import {generateCoc} from "../../../coc/generate-coc/generate-coc";
import {join} from "path";
import {CONSTANT} from "../../../constant/constant";
import {confirm} from "../../../util/prompt/confirm";

/**
 * Executes the 'coc' task
 *
 * @param options
 * @returns
 */
export async function cocTask({pkg, logger, prettier, config, root, fs, yes}: CocTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const cocText = generateCoc({contributors, config, prettier});
	const path = join(root, CONSTANT.codeOfConductFilename);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(path) ||
		fs.readFileSync(path, "utf8") === cocText ||
		(await confirm(`A ${CONSTANT.codeOfConductFilename} file already exists at path: ${path}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the CODE_OF_CONDUCT.md to disk
		logger.info(`Writing '${path}'`);
		fs.writeFileSync(path, cocText);
	}
}
