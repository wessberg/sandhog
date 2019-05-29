import {FundingTaskOptions} from "./funding-task-options";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package";
import {join} from "path";
import {CONSTANT} from "../../../constant/constant";
import {confirm} from "../../../util/prompt/confirm";
import {generateFunding} from "../../../funding/generate-funding/generate-funding";

/**
 * Executes the 'funding' task
 * @param {FundingTaskOptions} options
 * @returns {Promise<void>}
 */
export async function fundingTask({pkg, logger, prettier, config, root, fs, yes}: FundingTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const cocText = generateFunding({contributors, config, prettier});
	const dir = join(root, CONSTANT.GITHUB_DIR_NAME);
	const path = join(dir, CONSTANT.FUNDING_FILENAME);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(path) ||
		fs.readFileSync(path, "utf8") === cocText ||
		(await confirm(`A ${CONSTANT.FUNDING_FILENAME} file already exists at path: ${path}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Ensure that the .github directory exists
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
		// Write the FUNDING.yml to disk
		logger.info(`Writing '${path}'`);
		fs.writeFileSync(path, cocText);
	}
}
