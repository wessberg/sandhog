import {FindCodeStylesOptions} from "./find-code-styles-options.js";
import _fs from "fs";
import {CodeStyleKind} from "../code-style-kind.js";
import prettier from "prettier";
import path from "crosspath";
import eslintModule, {type Linter} from "eslint";
import {listFormat} from "../../util/list-format/list-format.js";
import {CONSTANT} from "../../constant/constant.js";
import {findPackage} from "../../package/find-package/find-package.js";
import {Package} from "../../package/package.js";
import {CodeStyle} from "./code-style.js";
import {getCodeStyleForCodeStyleKind} from "../get-code-style-for-code-style-kind/get-code-style-for-code-style-kind.js";

/**
 * Finds the code kind for the current project from the given root directory, if possible.
 * It will use various heuristics to attempt to do so. For example, if there is a prettier config
 * within the project, it is probably a Prettier project.
 */
export async function findCodeStyles({logger, root = process.cwd(), fs = {existsSync: _fs.existsSync}, pkg}: FindCodeStylesOptions): Promise<CodeStyle[]> {
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
	const eslintConfig = await findEslintConfig(root);
	if (eslintConfig != null) {
		logger.debug(`Found an ESLint config within the root. Parsing it for code styles`);
		const eslintCodeStyles = getCodeStylesFromEslintConfig(eslintConfig);

		// Log the results
		eslintCodeStyles.length > 0
			? logger.debug(
					`Detected ${listFormat(
						eslintCodeStyles.map(style => `"${style}"`),
						"and"
					)} as project code style${eslintCodeStyles.length === 1 ? "" : "s"}`
			  )
			: logger.debug(`No code styles detected inside ESLint config`);

		codeStyles.push(...eslintCodeStyles);
	}

	// Dedupe the results
	return [...new Set(codeStyles)].map(getCodeStyleForCodeStyleKind);
}

/**
 * Parses the given Config for all CodeStyleKinds
 */
function getCodeStylesFromEslintConfig(config: Linter.Config): CodeStyleKind[] {
	const ruleEntries = config.rules == null ? [] : Object.entries(config.rules);
	const codeStyles: CodeStyleKind[] = [];
	const extendsValue = config.extends == null ? [] : Array.isArray(config.extends) ? config.extends : [config.extends];
	const pluginsValue = config.plugins == null ? [] : Array.isArray(config.plugins) ? config.plugins : [config.plugins];
	const combinedValue = [...extendsValue, ...pluginsValue];

	// Check if it contains the Airbnb Style Guide
	const containsAirbnb = combinedValue.some(element => element === CONSTANT.eslintAirbnbCodeStyleName || element.includes(CONSTANT.eslintAirbnbCodeStyleHint));

	if (containsAirbnb) {
		codeStyles.push(CodeStyleKind.AIRBNB);
	}

	// Check if it contains the Google Javascript Style Guide
	const containsGoogle = combinedValue.some(element => element === CONSTANT.eslintGoogleCodeStyleName);

	if (containsGoogle) {
		codeStyles.push(CodeStyleKind.GOOGLE);
	}

	// Check if it contains Prettier
	const containsPrettier = combinedValue.some(element => element === CONSTANT.eslintPrettierCodeStyleName);

	if (containsPrettier) {
		codeStyles.push(CodeStyleKind.PRETTIER);
	}

	// Check if it contains Idiomatic
	const containsIdiomatic = combinedValue.some(element => element === CONSTANT.eslintIdiomaticCodeStyleName);

	if (containsIdiomatic) {
		codeStyles.push(CodeStyleKind.IDIOMATIC);
	}

	// Check if it contains Standard
	const containsStandard =
		combinedValue.some(element => element === CONSTANT.eslintStandardCodeStyleName) ||
		ruleEntries.some(([key, value]) => CONSTANT.eslintStandardCodeStyleHints.some(hint => key === hint && value !== "off" && JSON.stringify(value) !== JSON.stringify(["off"])));

	if (containsStandard) {
		codeStyles.push(CodeStyleKind.STANDARD);
	}

	// Check if it contains XO
	const containsXo = combinedValue.some(element => element === CONSTANT.eslintXoCodeStyleName);

	if (containsXo) {
		codeStyles.push(CodeStyleKind.XO);
	}

	return codeStyles;
}

/**
 * Finds (and parses) the found ESLint config, if any, from the given root
 */
async function findEslintConfig(root: string): Promise<Linter.Config | undefined> {
	const eslint = new eslintModule.ESLint({});
	// The config must be resolved for a specific file, so start from the package.json file (if it exists)
	try {
		return await eslint.calculateConfigForFile(path.native.join(root, "package.json"));
		return undefined;
	} catch {
		return undefined;
	}
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is a Prettier project
 */
async function isPrettier(root: string): Promise<boolean> {
	// It may throw if the config is malformed, so wrap it in a try-catch;
	try {
		const config = await prettier.resolveConfig(root);
		return config != null;
	} catch {
		// The config was found, but it was malformed. This doesn't change the fact that it was found, though,
		// so technically this *is* a Prettier project
		return true;
	}
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is an XO project
 *
 * @param pkg
 * @returns
 */
async function isXo(pkg: Package): Promise<boolean> {
	return "xo" in pkg || (pkg.dependencies != null && "xo" in pkg.dependencies) || (pkg.devDependencies != null && "xo" in pkg.devDependencies);
}

/**
 * Returns a Promise that resolves with a boolean value indicating if the project is a Standard project
 *
 * @param pkg
 * @returns
 */
async function isStandard(pkg: Package): Promise<boolean> {
	return "standard" in pkg || (pkg.dependencies != null && "standard" in pkg.dependencies) || (pkg.devDependencies != null && "standard" in pkg.devDependencies);
}
