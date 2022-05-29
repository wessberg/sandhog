import path from "crosspath";
import _fs from "fs";
import {FindPackageOptions} from "./find-package-options.js";
import {FindPackageResult} from "./find-package-result.js";

/**
 * Finds the nearest package.json from the given root directory
 */
export async function findPackage({root = process.cwd(), logger, fs = {existsSync: _fs.existsSync, readFileSync: _fs.readFileSync}}: FindPackageOptions): Promise<FindPackageResult> {
	const packageJsonPath = path.join(root, "package.json");
	const nativePackageJsonPath = path.native.normalize(packageJsonPath);
	if (fs.existsSync(nativePackageJsonPath)) {
		logger.debug(`Found package.json: ${nativePackageJsonPath}`);

		return {
			root: path.dirname(packageJsonPath),
			pkg: JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))
		};
	}

	// Rewrite the root to check the parent directory
	const newRoot = path.join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") {
		throw new ReferenceError(`Could not find a package.json. Are you sure you are running sandhog inside an NPM project?`);
	}

	// Call recursively
	return await findPackage({
		root: newRoot,
		logger
	});
}
