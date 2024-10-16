import type {Package} from "../package.js";

const REGEX = /(http?s?:\/\/?)?(www\.)?github.com\//g;

/**
 * Takes the Github repository name from the given Package
 *
 * @param pkg
 * @returns
 */
export function takeGithubRepositoryName(pkg: Package): string | undefined {
	if (pkg.repository?.url == null) return undefined;
	return pkg.repository.url.replace(REGEX, "").replace(".git", "");
}
