import path from "crosspath";
import _fs from "fs";
import json5 from "json5";
import yaml from "yaml";
import {SandhogConfig} from "../sandhog-config.js";
import {CONSTANT} from "../../constant/constant.js";
import {FindConfigOptions} from "./find-config-options.js";
import {findPackage} from "../../package/find-package/find-package.js";
import {ILogger} from "../../logger/i-logger.js";
import {FileSystem} from "../../file-system/file-system.js";
import {PartialDeep} from "helpertypes";

/**
 * Finds a sandhog config if possible
 */
export async function findConfig({
	filename,
	logger,
	root = process.cwd(),
	fs = {existsSync: _fs.existsSync, readFileSync: _fs.readFileSync},
	pkg
}: FindConfigOptions): Promise<PartialDeep<SandhogConfig> | undefined> {
	if (pkg == null) {
		pkg = (await findPackage({root, logger, fs})).pkg;
	}
	logger.debug(`Checking package.json for config`);
	if (pkg.sandhog != null) {
		logger.debug(`Matched config in package.json`);
		return pkg.sandhog;
	}

	// If it wasn't matched in the package, attempt to resolve a config file
	return await findConfigRecursiveStep(root, logger, fs, filename);
}

/**
 * The recursive step of the findConfig algorithm
 */
async function findConfigRecursiveStep(
	root: string,
	logger: ILogger,
	fs: Pick<FileSystem, "existsSync" | "readFileSync">,
	filename?: string
): Promise<PartialDeep<SandhogConfig> | undefined> {
	const absolutePaths =
		filename != null
			? [path.isAbsolute(filename) ? path.normalize(filename) : path.join(root, filename)]
			: [
					path.join(root, CONSTANT.configFilenameJs),
					path.join(root, CONSTANT.configFilenameCjs),
					path.join(root, CONSTANT.configFilenameMjs),
					path.join(root, CONSTANT.configFilenameJson),
					path.join(root, CONSTANT.configFilenameJson5),
					path.join(root, CONSTANT.configFilenameYaml),
					path.join(root, CONSTANT.configFilenameYml),
					path.join(root, CONSTANT.configFilenameRc)
			  ];

	for (const absolutePath of absolutePaths) {
		const nativeAbsolutePath = path.native.normalize(absolutePath);
		logger.debug(`Checking path for config: ${nativeAbsolutePath}`);
		if (fs.existsSync(nativeAbsolutePath)) {
			logger.debug(`Matched config at path: ${nativeAbsolutePath}`);
			const ext = path.extname(absolutePath);

			switch (ext) {
				case "":
				case ".json5":
				case ".json":
					// If it is extension-less, or if it has a .json[5] extension, parse it as JSON5
					return json5.parse(fs.readFileSync(nativeAbsolutePath, "utf8"));

				case ".yml":
				case ".yaml":
					// If it has a .y[a]ml extension, parse it as YAML
					return yaml.parse(fs.readFileSync(nativeAbsolutePath, "utf8"));
				default:
					// Otherwise, use the module loader directly
					return await import(`file://${absolutePath}`);
			}
		}
	}

	// Rewrite the root to check the parent directory
	const newRoot = path.join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") return undefined;

	// Call recursively
	return await findConfigRecursiveStep(newRoot, logger, fs, filename);
}
