import {FindCodeStylesOptions} from "./find-code-styles-options";
import {existsSync as _existsSync} from "fs";
import {CodeStyleKind} from "../code-style-kind";
import {resolveConfig} from "prettier";
import {dirname, join} from "path";
import {CLIEngine, Linter} from "eslint";
import {Configuration} from "tslint";
import {listFormat} from "../../util/list-format/list-format";
import {CONSTANT} from "../../constant/constant";
import {isLib} from "../../util/path/is-lib";
import {FileSystem} from "../../file-system/file-system";
import {findPackage} from "../../package/find-package/find-package";
import {Package} from "../../package/package";
import {CodeStyle} from "./code-style";
import {getCodeStyleForCodeStyleKind} from "../get-code-style-for-code-style-kind/get-code-style-for-code-style-kind";

/**
 * Finds the code kind for the current project from the given root directory, if possible.
 * It will use various heuristics to attempt to do so. For example, if there is a prettier config
 * within the project, it is probably a Prettier project.
 * @param {FindLicenseOptions} options
 * @returns {Promise<CodeStyle[]>}
 */
export async function findCodeStyles({logger, root = process.cwd(), fs = {existsSync: _existsSync}, pkg}: FindCodeStylesOptions): Promise<CodeStyle[]> {
	if (pkg == null) {
		pkg = (await findPackage({root, logger, fs})).pkg;
	}

	const codeStyles: CodeStyleKind[] = [];

	logger.debug(`Trying to detect code style from root: '${root}'`);

	// If a Prettier config can be found from the root, we know that Prettier has some relation to the project
	if (await isPrettier(root)) {
		logger.debug(`Detected "Prettier" as a project code style.`);
		codeStyles.push(CodeStyleKind.PRETTIER);
	}

	if (await isXo(pkg)) {
		logger.debug(`Detected "XO" as a project code style.`);
		codeStyles.push(CodeStyleKind.XO);
	}

	if (await isStandard(pkg)) {
		logger.debug(`Detected "Standard" as a project code style.`);
		codeStyles.push(CodeStyleKind.STANDARD);
	}

	// Try to resolve an ESLint config from the root. It may contain some rules or
	// extended configs we can extract code styles from
	const eslintConfig = findEslintConfig(root);
	if (eslintConfig != null) {
		logger.debug(`Found an ESLint config within the root. Parsing it for code styles`);
		const eslintCodeStyles = getCodeStylesFromEslintConfig(eslintConfig);

		// Log the results
		eslintCodeStyles.length > 0
			? logger.debug(`Detected ${listFormat(eslintCodeStyles.map(style => `"${style}"`), "and")} as project code style${eslintCodeStyles.length === 1 ? "" : "s"}`)
			: logger.debug(`No code styles detected inside ESLint config`);

		codeStyles.push(...eslintCodeStyles);
	}

	const tslintConfig = findTslintConfig(root, fs);
	if (tslintConfig != null) {
		logger.debug(`Found a TSLint config within the root. Parsing it for code styles`);
		const tslintCodeStyles = getCodeStylesFromTslintConfig(tslintConfig);

		// Log the results
		tslintCodeStyles.length > 0
			? logger.debug(`Detected ${listFormat(tslintCodeStyles.map(style => `"${style}"`), "and")} as project code style${tslintCodeStyles.length === 1 ? "" : "s"}`)
			: logger.debug(`No code styles detected inside TSLint config`);

		codeStyles.push(...tslintCodeStyles);
	}

	// Dedupe the results
	return [...new Set(codeStyles)].map(getCodeStyleForCodeStyleKind);
}

/**
 * Parses the given Config for all CodeStyleKinds
 * @param {Linter.Config} config
 * @returns {CodeStyleKind[]}
 */
function getCodeStylesFromEslintConfig(config: Linter.Config & {extends?: string[]}): CodeStyleKind[] {
	const ruleKeys = config.rules == null ? [] : Object.keys(config.rules);
	const codeStyles: CodeStyleKind[] = [];

	// Check if it contains the Airbnb Style Guide
	const containsAirbnb = config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_AIRBNB_CODE_STYLE_NAME || element.includes(CONSTANT.ESLINT_AIRBNB_CODE_STYLE_HINT));

	if (containsAirbnb) {
		codeStyles.push(CodeStyleKind.AIRBNB);
	}

	// Check if it contains the Google Javascript Style Guide
	const containsGoogle = config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_GOOGLE_CODE_STYLE_NAME);

	if (containsGoogle) {
		codeStyles.push(CodeStyleKind.GOOGLE);
	}

	// Check if it contains Prettier
	const containsPrettier = config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_PRETTIER_CODE_STYLE_NAME);

	if (containsPrettier) {
		codeStyles.push(CodeStyleKind.PRETTIER);
	}

	// Check if it contains Idiomatic
	const containsIdiomatic = config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_IDIOMATIC_CODE_STYLE_NAME);

	if (containsIdiomatic) {
		codeStyles.push(CodeStyleKind.IDIOMATIC);
	}

	// Check if it contains Standard
	const containsStandard =
		(config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_STANDARD_CODE_STYLE_NAME)) ||
		ruleKeys.some(key => CONSTANT.ESLINT_STANDARD_CODE_STYLE_HINTS.some(hint => key === hint));

	if (containsStandard) {
		codeStyles.push(CodeStyleKind.STANDARD);
	}

	// Check if it contains XO
	const containsXo = config.extends != null && config.extends.some(element => element === CONSTANT.ESLINT_XO_CODE_STYLE_NAME);

	if (containsXo) {
		codeStyles.push(CodeStyleKind.XO);
	}

	return codeStyles;
}

/**
 * Parses the given Config for all CodeStyleKinds
 * @param {{extends: string[]}} config
 * @returns {CodeStyleKind[]}
 */
function getCodeStylesFromTslintConfig(config: {extends: string[]}): CodeStyleKind[] {
	const codeStyles: CodeStyleKind[] = [];

	// Check if it contains the Airbnb Style Guide
	const containsAirbnb = config.extends.some(element => element === CONSTANT.TSLINT_AIRBNB_CODE_STYLE_NAME);

	if (containsAirbnb) {
		codeStyles.push(CodeStyleKind.AIRBNB);
	}

	// Check if it contains the Standard Style Guide
	const containsStandard = config.extends.some(element => element === CONSTANT.TSLINT_STANDARD_CODE_STYLE_NAME);

	if (containsStandard) {
		codeStyles.push(CodeStyleKind.STANDARD);
	}

	// Check if it contains the Prettier Style Guide
	const containsPrettier = config.extends.some(element => element === CONSTANT.TSLINT_PRETTIER_CODE_STYLE_NAME);

	if (containsPrettier) {
		codeStyles.push(CodeStyleKind.PRETTIER);
	}

	return codeStyles;
}

/**
 * Finds (and parses) the found ESLint config, if any, from the given root
 * @param {string} root
 * @returns {Linter.Config?}
 */
function findEslintConfig(root: string): Linter.Config | undefined {
	const engine = new CLIEngine({});
	// The config must be resolved for a specific file, so start from the package.json file (if it exists)
	try {
		return engine.getConfigForFile(join(root, "package.json"));
	} catch {
		return undefined;
	}
}

/**
 * Finds (and parses) the found TSLint config, if any, from the given root
 * @param {string} root
 * @param {Pick<FileSystem, "existsSync">} fs
 * @returns {IConfigurationFile?}
 */
function findTslintConfig(root: string, fs: Pick<FileSystem, "existsSync">): {extends: string[]} | undefined {
	const path = Configuration.findConfigurationPath(null, root);
	if (path == null) return undefined;
	return {
		// Dedupe the results
		extends: [...new Set(walkTslintConfigs(path, fs))]
	};
}

/**
 * Walks TSLint configs recursively from the given input path, trying to resolve all extended configs
 * @param {string} inputPath
 * @param {Pick<FileSystem, "existsSync">} fs
 */
function walkTslintConfigs(inputPath: string, fs: Pick<FileSystem, "existsSync">): string[] {
	const allExtendedConfigs: string[] = [];

	const rawConfig = Configuration.readConfigurationFile(inputPath);
	const extendsField = rawConfig.extends == null ? [] : Array.isArray(rawConfig.extends) ? rawConfig.extends : [rawConfig.extends];

	for (const element of extendsField) {
		// If it represents an identifier for an extended config (for example 'tslint-config-airbnb'), add it to the Set
		if (isLib(element)) allExtendedConfigs.push(element);
		// Otherwise, resolve the config that is referenced and check that config for things
		else {
			const absolutePath = join(dirname(inputPath), element);
			// If that file doesn't exist, don't do anything else
			if (!fs.existsSync(absolutePath)) continue;

			// Otherwise, load and parse that config recursively
			allExtendedConfigs.push(...walkTslintConfigs(absolutePath, fs));
		}
	}
	return allExtendedConfigs;
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is a Prettier project
 * @param {string} root
 * @returns {Promise<boolean>}
 */
async function isPrettier(root: string): Promise<boolean> {
	// It may throw if the config is malformed, so wrap it in a try-catch;
	try {
		const config = await resolveConfig(root);
		return config != null;
	} catch {
		// The config was found, but it was malformed. This doesn't change the fact that it was found, though,
		// so technically this *is* a Prettier project
		return true;
	}
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is an XO project
 * @param {Package} pkg
 * @returns {Promise<boolean>}
 */
async function isXo(pkg: Package): Promise<boolean> {
	return "xo" in pkg || (pkg.dependencies != null && "xo" in pkg.dependencies) || (pkg.devDependencies != null && "xo" in pkg.devDependencies);
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is a Standard project
 * @param {Package} pkg
 * @returns {Promise<boolean>}
 */
async function isStandard(pkg: Package): Promise<boolean> {
	return "standard" in pkg || (pkg.dependencies != null && "standard" in pkg.dependencies) || (pkg.devDependencies != null && "standard" in pkg.devDependencies);
}
