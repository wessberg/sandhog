import type {LicenseTaskOptions} from "./license-task-options.js";
import path from "crosspath";
import {CONSTANT} from "../../../constant/constant.js";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package.js";
import {generateLicense} from "../../../license/generate-license/generate-license.js";
import {confirm} from "../../../util/prompt/confirm.js";

/**
 * Executes the 'license' task
 */
export async function licenseTask({logger, root, license, prettier, config, pkg, fs, yes}: LicenseTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const licenseText = await generateLicense(license, {contributors, config, prettier, pkg});
	const pathFromRoot = path.join(root, CONSTANT.licenseFilename);
	const nativePath = path.native.normalize(pathFromRoot);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(nativePath) ||
		fs.readFileSync(nativePath, "utf8") === licenseText ||
		(await confirm(`A ${CONSTANT.licenseFilename} file already exists at path: ${nativePath}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the LICENSE.md to disk
		logger.info(`Writing '${nativePath}'`);
		fs.writeFileSync(nativePath, licenseText);
	}
}
