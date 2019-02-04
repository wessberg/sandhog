import {GenerateContributingOptions} from "./generate-contributing-options";
import {listFormat} from "../../util/list-format/list-format";

/**
 * Generates a CONTRIBUTING.md based on the given options
 * @param {GenerateContributingOptions} options
 */
export function generateContributing({contributors, prettier, config, pkg}: GenerateContributingOptions): string {
	return prettier.format(
		`\
You are more than welcome to contribute to \`${pkg.name}\` in any way you please, including:

- Updating documentation.
- Fixing spelling and grammar
- Adding tests
- Fixing issues and suggesting new features
- Blogging, tweeting, and creating tutorials about \`${pkg.name}\`
${
	contributors.every(contributor => contributor.twitter == null)
		? ""
		: `- Reaching out to ${listFormat(
				contributors.filter(contributor => contributor.twitter != null).map(contributor => `[@${contributor.twitter}](https://twitter.com/${contributor.twitter})`),
				"or"
		  )} on Twitter`
}
- Submit an issue or a Pull Request`,
		{
			...config.prettier,
			parser: "markdown"
		}
	);
}
