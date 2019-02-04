import {ScaffoldConfig} from "../scaffold-config";
import {existsSync as _existsSync, readFileSync as _readFileSync} from "fs";
import {CONSTANT} from "../../constant/constant";
import {extname, isAbsolute, join} from "path";
import {FindConfigOptions} from "./find-config-options";
import {DeepPartial} from "../../util/type/deep-partial";
import {findPackage} from "../../package/find-package/find-package";
import {ILogger} from "../../logger/i-logger";
import {FileSystem} from "../../file-system/file-system";
import json5 from "json5";

/**
 * Finds a scaffold config if possible
 * @param {FindConfigOptions} options
 * @returns {Promise<DeepPartial<ScaffoldConfig>?>}
 */
export async function findConfig({
	filename,
	logger,
	root = process.cwd(),
	fs = {existsSync: _existsSync, readFileSync: _readFileSync},
	pkg
}: FindConfigOptions): Promise<DeepPartial<ScaffoldConfig> | undefined> {
	if (pkg == null) {
		pkg = (await findPackage({root, logger, fs})).pkg;
	}
	logger.debug(`Checking package.json for config`);
	if (pkg.scaffold != null) {
		logger.debug(`Matched config in package.json`);
		return pkg.scaffold;
	}

	// If it wasn't matched in the package, attempt to resolve a config file
	return await findConfigRecursiveStep(root, logger, fs, filename);
}

/**
 * The recursive step of the findConfig algorithm
 * @param {string} root
 * @param {ILogger} logger
 * @param {Pick<FileSystem, "existsSync">} fs
 * @param {string} [filename]
 * @returns {Promise<DeepPartial<ScaffoldConfig>?>}
 */
async function findConfigRecursiveStep(root: string, logger: ILogger, fs: Pick<FileSystem, "existsSync" | "readFileSync">, filename?: string): Promise<DeepPartial<ScaffoldConfig> | undefined> {
	const absolutePaths =
		filename != null
			? [isAbsolute(filename) ? filename : join(root, filename)]
			: [join(root, CONSTANT.CONFIG_FILENAME_JS), join(root, CONSTANT.CONFIG_FILENAME_JSON), join(root, CONSTANT.CONFIG_FILENAME_JSON5), join(root, CONSTANT.CONFIG_FILENAME_RC)];

	for (const path of absolutePaths) {
		logger.debug(`Checking path for config: ${path}`);
		if (fs.existsSync(path)) {
			logger.debug(`Matched config at path: ${path}`);

			// If it is extension-less, parse it as JSON5
			if (extname(path) === "" || extname(path) === ".json5" || extname(path) === ".json") {
				return json5.parse(fs.readFileSync(path, "utf8"));
			}

			// Otherwise, use the module loader directly
			return await import(path);
		}
	}

	// Rewrite the root to check the parent directory
	const newRoot = join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") return undefined;

	// Call recursively
	return await findConfigRecursiveStep(newRoot, logger, fs, filename);
}
