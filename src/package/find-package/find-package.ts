import {FindPackageOptions} from "./find-package-options";
import {dirname, join} from "path";
import {existsSync as _existsSync} from "fs";
import {FindPackageResult} from "./find-package-result";

/**
 * Finds the nearest package.json from the given root directory
 * @param {FindPackageOptions} options
 * @returns {Promise<FindPackageResult>}
 */
export async function findPackage({root = process.cwd(), logger, fs = {existsSync: _existsSync}}: FindPackageOptions): Promise<FindPackageResult> {
	const packageJsonPath = join(root, "package.json");
	if (fs.existsSync(packageJsonPath)) {
		logger.debug(`Found package.json: ${packageJsonPath}`);

		return {
			root: dirname(packageJsonPath),
			pkg: await import(packageJsonPath)
		};
	}

	// Rewrite the root to check the parent directory
	const newRoot = join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") {
		throw new ReferenceError(`Could not find a package.json. Are you sure you are running Scaffold inside an NPM project?`);
	}

	// Call recursively
	return await findPackage({
		root: newRoot,
		logger
	});
}
