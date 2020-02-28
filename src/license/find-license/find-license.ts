import {FindLicenseOptions} from "./find-license-options";
import {join} from "path";
import {existsSync as _existsSync, readFileSync as _readFileSync} from "fs";
import {LicenseName} from "../license-name";
import {isKnownLicenseName} from "../is-known-license-name";
import {CONSTANT} from "../../constant/constant";
import {ILogger} from "../../logger/i-logger";
import {findPackage} from "../../package/find-package/find-package";
import {FileSystem} from "../../file-system/file-system";
import {detectLicense} from "../detect-license/detect-license";

/**
 * Finds the project license from the given root directory.
 * It may be listed in the package.json file, or it may exist within the root as a LICENSE.md file already
 *
 * @param options
 * @returns
 */
export async function findLicense({
	logger,
	root = process.cwd(),
	fs = {existsSync: _existsSync, readFileSync: _readFileSync},
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

	const [text, path] = license;

	// Otherwise, try to parse it to determine the license
	logger.verbose(`Detecting license for file: ${path}`);

	const name = detectLicense(text);

	// Ensure that it is valid and supported
	if (name == null || !isKnownLicenseName(name)) {
		throw new TypeError(`The license found on path: '${path}' is not valid or not supported`);
	}

	logger.verbose(`Detected license: '${name}' for file: ${path}`);
	return name;
}

/**
 * The recursive step of the findConfig algorithm
 *
 * @param root
 * @param logger
 * @param fs
 * @returns
 */
function findLicenseRecursiveStep(root: string, logger: ILogger, fs: Pick<FileSystem, "existsSync" | "readFileSync">): [string, string] | undefined {
	const absolutePath = join(root, CONSTANT.LICENSE_FILENAME);

	logger.debug(`Checking path for license: ${absolutePath}`);
	if (fs.existsSync(absolutePath)) {
		logger.debug(`Matched license at path: ${absolutePath}`);
		return [fs.readFileSync(absolutePath).toString(), absolutePath];
	}

	// Rewrite the root to check the parent directory
	const newRoot = join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") return undefined;

	// Call recursively
	return findLicenseRecursiveStep(newRoot, logger, fs);
}
