import {LicenseTaskOptions} from "./license-task-options";
import {join} from "path";
import {CONSTANT} from "../../../constant/constant";
import {getContributorsFromPackage} from "../../../contributor/get-contributors-from-package";
import {generateLicense} from "../../../license/generate-license/generate-license";
import {confirm} from "../../../util/prompt/confirm";

/**
 * Executes the 'license' task
 * @param {LicenseTaskOptions} options
 * @returns {Promise<void>}
 */
export async function licenseTask({logger, root, license, prettier, config, pkg, fs, yes}: LicenseTaskOptions): Promise<void> {
	const contributors = getContributorsFromPackage(pkg);
	const licenseText = await generateLicense(license, {contributors, config, prettier, pkg});
	const path = join(root, CONSTANT.LICENSE_FILENAME);

	// If all prompts shouldn't be auto-accepted, request permission to overwrite it
	const writePermission =
		yes ||
		!fs.existsSync(path) ||
		fs.readFileSync(path, "utf8") === licenseText ||
		(await confirm(`A ${CONSTANT.LICENSE_FILENAME} file already exists at path: ${path}. Do you wish to overwrite it?`, false));

	if (writePermission) {
		// Write the LICENSE.md to disk
		logger.info(`Writing '${path}'`);
		fs.writeFileSync(path, licenseText);
	}
}
