import {ReadmeTaskOptions} from "./readme-task-options.js";
import path from "crosspath";
import {CONSTANT} from "../../../constant/constant.js";
import {confirm} from "../../../util/prompt/confirm.js";
import {generateReadme} from "../../../readme/generate-readme/generate-readme.js";

/**
 * Executes the 'license' task
 */
export async function readmeTask(options: ReadmeTaskOptions): Promise<void> {
	// Find all relevant sections for the README
	const {logger, root, fs, yes} = options;

	const pathFromRoot = path.join(root, CONSTANT.readmeFilename);
	const nativePath = path.native.normalize(pathFromRoot);
	const existingReadme = fs.existsSync(nativePath) ? fs.readFileSync(nativePath, "utf8") : undefined;

	const readmeText = await generateReadme({
		...options,
		existingReadme
	});

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(nativePath) ||
		fs.readFileSync(nativePath, "utf8") === readmeText ||
		(await confirm(`A ${CONSTANT.readmeFilename} file already exists at path: ${nativePath}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the README.md to disk
		logger.info(`Writing '${nativePath}'`);
		fs.writeFileSync(nativePath, readmeText);
	}
}
