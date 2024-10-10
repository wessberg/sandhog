import type {FundingTaskOptions} from "./funding-task-options.js";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package.js";
import path from "crosspath";
import {CONSTANT} from "../../../constant/constant.js";
import {confirm} from "../../../util/prompt/confirm.js";
import {generateFunding} from "../../../funding/generate-funding/generate-funding.js";

/**
 * Executes the 'funding' task
 */
export async function fundingTask({pkg, logger, prettier, config, root, fs, yes}: FundingTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const cocText = await generateFunding({contributors, config, prettier});
	const dir = path.join(root, CONSTANT.githubDirName);
	const pathFromRoot = path.join(dir, CONSTANT.fundingFilename);
	const nativeDir = path.native.normalize(dir);
	const nativePath = path.native.normalize(pathFromRoot);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(nativePath) ||
		fs.readFileSync(nativePath, "utf8") === cocText ||
		(await confirm(`A ${CONSTANT.fundingFilename} file already exists at path: ${nativePath}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Ensure that the .github directory exists
		if (!fs.existsSync(nativeDir)) {
			fs.mkdirSync(nativeDir);
		}
		// Write the FUNDING.yml to disk
		logger.info(`Writing '${nativePath}'`);
		fs.writeFileSync(nativePath, cocText);
	}
}
