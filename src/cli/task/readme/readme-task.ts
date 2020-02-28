import {ReadmeTaskOptions} from "./readme-task-options";
import {join} from "path";
import {CONSTANT} from "../../../constant/constant";
import {confirm} from "../../../util/prompt/confirm";
import {generateReadme} from "../../../readme/generate-readme/generate-readme";

/**
 * Executes the 'license' task
 *
 * @param options
 * @returns
 */
export async function readmeTask(options: ReadmeTaskOptions): Promise<void> {
	// Find all relevant sections for the README
	const {logger, root, fs, yes} = options;

	const path = join(root, CONSTANT.README_FILENAME);
	const existingReadme = fs.existsSync(path) ? fs.readFileSync(path, "utf8") : undefined;

	const readmeText = await generateReadme({
		...options,
		existingReadme
	});

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(path) ||
		fs.readFileSync(path, "utf8") === readmeText ||
		(await confirm(`A ${CONSTANT.README_FILENAME} file already exists at path: ${path}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the README.md to disk
		logger.info(`Writing '${path}'`);
		fs.writeFileSync(path, readmeText);
	}
}
