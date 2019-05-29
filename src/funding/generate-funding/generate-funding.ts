import {GenerateFundingOptions} from "./generate-funding-options";
import {Contributor} from "../../contributor/contributor";

/**
 * Generates a FUNDING.yml based on the given options
 * @param {GenerateFundingOptions} options
 */
export function generateFunding({contributors, prettier, config}: GenerateFundingOptions): string {
	let yaml = ``;
	// Take all of the contributors that has a github username defined in the package.json file.
	// These will be the fundable ones. For those, take their Github user names and deduplicate them
	const githubUserNames = [...new Set(contributors.filter((contributor): contributor is Contributor & {github: string} => contributor.github != null).map(({github}) => github))];

	if (githubUserNames.length === 1) {
		yaml += `github: ${githubUserNames[0]}\n`;
	} else if (githubUserNames.length > 1) {
		yaml += `github: [${githubUserNames.join(", ")}]\n`;
	}

	if (config.donate.patreon.userId != null) {
		yaml += `patreon: ${config.donate.patreon.userId}`;
	}

	if (config.donate.openCollective.project != null) {
		yaml += `open_collective: ${config.donate.openCollective.project}`;
	}

	return prettier.format(yaml, {
		...config.prettier,
		parser: "yaml"
	});
}
