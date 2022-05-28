import {SandhogConfig} from "../sandhog-config";
import {existsSync as _existsSync, readFileSync as _readFileSync} from "fs";
import {CONSTANT} from "../../constant/constant";
import {extname, isAbsolute, join} from "path";
import {FindConfigOptions} from "./find-config-options";
import {findPackage} from "../../package/find-package/find-package";
import {ILogger} from "../../logger/i-logger";
import {FileSystem} from "../../file-system/file-system";
import json5 from "json5";
import yaml from "yaml";
import {PartialDeep} from "helpertypes";

/**
 * Finds a sandhog config if possible
 */
export async function findConfig({
	filename,
	logger,
	root = process.cwd(),
	fs = {existsSync: _existsSync, readFileSync: _readFileSync},
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
			? [isAbsolute(filename) ? filename : join(root, filename)]
			: [
					join(root, CONSTANT.configFilenameJs),
					join(root, CONSTANT.configFilenameCjs),
					join(root, CONSTANT.configFilenameMjs),
					join(root, CONSTANT.configFilenameJson),
					join(root, CONSTANT.configFilenameJson5),
					join(root, CONSTANT.configFilenameYaml),
					join(root, CONSTANT.configFilenameYml),
					join(root, CONSTANT.configFilenameRc)
			  ];

	for (const path of absolutePaths) {
		logger.debug(`Checking path for config: ${path}`);
		if (fs.existsSync(path)) {
			logger.debug(`Matched config at path: ${path}`);
			const ext = extname(path);

			switch (ext) {
				case "":
				case ".json5":
				case ".json":
					// If it is extension-less, or if it has a .json[5] extension, parse it as JSON5
					return json5.parse(fs.readFileSync(path, "utf8"));

				case ".yml":
				case ".yaml":
					// If it has a .y[a]ml extension, parse it as YAML
					return yaml.parse(fs.readFileSync(path, "utf8"));
				default:
					// Otherwise, use the module loader directly
					return await import(path);
			}
		}
	}

	// Rewrite the root to check the parent directory
	const newRoot = join(root, "../");

	// If there is no more parent directories to look in, no config exists
	if (newRoot === root || newRoot === "/" || newRoot === "") return undefined;

	// Call recursively
	return await findConfigRecursiveStep(newRoot, logger, fs, filename);
}
