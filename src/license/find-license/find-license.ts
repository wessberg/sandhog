import path from "crosspath";
import _fs from "fs";
import type {FindLicenseOptions} from "./find-license-options.js";
import type {LicenseName} from "../license-name.js";
import {isKnownLicenseName} from "../is-known-license-name.js";
import {CONSTANT} from "../../constant/constant.js";
import type {ILogger} from "../../logger/i-logger.js";
import {findPackage} from "../../package/find-package/find-package.js";
import type {FileSystem} from "../../file-system/file-system.js";
import {detectLicense} from "../detect-license/detect-license.js";

/**
 * Finds the project license from the given root directory.
 * It may be listed in the package.json file, or it may exist within the root as a LICENSE.md file already
 */
export async function findLicense({
	logger,
	root = process.cwd(),
	fs = {existsSync: _fs.existsSync, readFileSync: _fs.readFileSync},
	pkg
}: FindLicenseOptions): Promise<LicenseName | undefined> {
	if (pkg == null) {
		pkg = (await findPackage({root, logger, fs})).pkg;
	}
	// If the package.json file includes a license, just use that one.
	logger.debug(`Trying to locate license inside package.json`);
	if (pkg.license != null) {
		logger.debug(`Found license: '${pkg.license}' inside package.json`);

		// Ensure that it is valid and supported
		if (!isKnownLicenseName(pkg.license)) {
			throw new TypeError(`The license found within package.json: '${pkg.license}' is not valid or not supported`);
		}

		return pkg.license;
	}

	// Otherwise, we have to be smart about it. Recursively try to locate a LICENSE.md file
	const license = findLicenseRecursiveStep(root, logger, fs);

	// If no license could be found, return immediately
	if (license == null) {
		return undefined;
	}

	const [text, p] = license;
	const nativePath = path.native.normalize(p);

	// Otherwise, try to parse it to determine the license
	logger.verbose(`Detecting license for file: ${nativePath}`);

	const name = detectLicense(text);

	// Ensure that it is valid and supported
	if (name == null || !isKnownLicenseName(name)) {
		throw new TypeError(`The license found on path: '${nativePath}' is not valid or not supported`);
	}

	logger.verbose(`Detected license: '${name}' for file: ${nativePath}`);
	return name;
}

/**
 * The recursive step of the findConfig algorithm
 */
function findLicenseRecursiveStep(root: string, logger: ILogger, fs: Pick<FileSystem, "existsSync" | "readFileSync">): [string, string] | undefined {
	const absolutePath = path.join(root, CONSTANT.licenseFilename);
	const nativeAbsolutePath = path.native.normalize(absolutePath);

	logger.debug(`Checking path for license: ${nativeAbsolutePath}`);
	if (fs.existsSync(nativeAbsolutePath)) {
		logger.debug(`Matched license at path: ${nativeAbsolutePath}`);
		return [fs.readFileSync(nativeAbsolutePath).toString(), absolutePath];
	}

	// Rewrite the root to check the parent directory
	const newRoot = path.join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") return undefined;

	// Call recursively
	return findLicenseRecursiveStep(newRoot, logger, fs);
}
