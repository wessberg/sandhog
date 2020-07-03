import {FindCodeStylesOptions} from "./find-code-styles-options";
import {existsSync as _existsSync} from "fs";
import {CodeStyleKind} from "../code-style-kind";
import {resolveConfig} from "prettier";
import {join} from "path";
import {CLIEngine, Linter} from "eslint";
import {listFormat} from "../../util/list-format/list-format";
import {CONSTANT} from "../../constant/constant";
import {findPackage} from "../../package/find-package/find-package";
import {Package} from "../../package/package";
import {CodeStyle} from "./code-style";
import {getCodeStyleForCodeStyleKind} from "../get-code-style-for-code-style-kind/get-code-style-for-code-style-kind";

/**
 * Finds the code kind for the current project from the given root directory, if possible.
 * It will use various heuristics to attempt to do so. For example, if there is a prettier config
 * within the project, it is probably a Prettier project.
 *
 * @param options
 * @returns
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
 *
 * @param config
 * @returns
 */
function getCodeStylesFromEslintConfig(config: Linter.Config): CodeStyleKind[] {
	const ruleKeys = config.rules == null ? [] : Object.keys(config.rules);
	const codeStyles: CodeStyleKind[] = [];
	const extendsValue = config.extends == null ? undefined : Array.isArray(config.extends) ? config.extends : [config.extends];

	// Check if it contains the Airbnb Style Guide
	const containsAirbnb =
		extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintAirbnbCodeStyleName || element.includes(CONSTANT.eslintAirbnbCodeStyleHint));

	if (containsAirbnb) {
		codeStyles.push(CodeStyleKind.AIRBNB);
	}

	// Check if it contains the Google Javascript Style Guide
	const containsGoogle = extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintGoogleCodeStyleName);

	if (containsGoogle) {
		codeStyles.push(CodeStyleKind.GOOGLE);
	}

	// Check if it contains Prettier
	const containsPrettier = extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintPrettierCodeStyleName);

	if (containsPrettier) {
		codeStyles.push(CodeStyleKind.PRETTIER);
	}

	// Check if it contains Idiomatic
	const containsIdiomatic = extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintIdiomaticCodeStyleName);

	if (containsIdiomatic) {
		codeStyles.push(CodeStyleKind.IDIOMATIC);
	}

	// Check if it contains Standard
	const containsStandard =
		(extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintStandardCodeStyleName)) ||
		ruleKeys.some(key => CONSTANT.eslintStandardCodeStyleHints.some(hint => key === hint));

	if (containsStandard) {
		codeStyles.push(CodeStyleKind.STANDARD);
	}

	// Check if it contains XO
	const containsXo = extendsValue != null && extendsValue.some(element => element === CONSTANT.eslintXoCodeStyleName);

	if (containsXo) {
		codeStyles.push(CodeStyleKind.XO);
	}

	return codeStyles;
}

/**
 * Finds (and parses) the found ESLint config, if any, from the given root
 *
 * @param root
 * @returns
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
 * Returns a Promise that resolves with a boolean value indicating if the project is a Prettier project
 *
 * @param root
 * @returns
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
