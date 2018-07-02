import {IContributorService} from "./i-contributor-service";
import {IContributor, IPackageJson} from "../../package-json/i-package-json";

/**
 * A service that helps with taking the contributors from a package.json file and generating a CONTRIBUTING.md file
 */
export class ContributorService implements IContributorService {

	/**
	 * Gets all contributors from the given options
	 * @param {IPackageJson} packageJson
	 * @returns {IContributor[]}
	 */
	public getContributors (packageJson: IPackageJson): IContributor[] {
		const contributors: Map<string, IContributor> = new Map();
		if (packageJson.author != null) {
			contributors.set(packageJson.author.name, packageJson.author);
		}
		if (packageJson.authors != null) {
			packageJson.authors.forEach(author => contributors.set(author.name, author));
		}
		if (packageJson.contributors != null) {
			packageJson.contributors.forEach(author => contributors.set(author.name, author));
		}
		return [...contributors.values()].map(contributor => {
			if (packageJson.scaffold == null || packageJson.scaffold.contributorMeta == null) return contributor;

			// Check if an image URL is associated with that contributor
			const match = Object.entries(packageJson.scaffold.contributorMeta).find(([contributorName]) => contributorName === contributor.name);

			// Add the image URL to the author of it was matched
			if (match != null) {
				const [, contributorMeta] = match;
				Object.assign(contributor, contributorMeta);
			}

			return contributor;
		});
	}

	/**
	 * Gets the text that should be placed a in a CONTRIBUTING.md file
	 * @param {IPackageJson} packageJson
	 * @param {IContributor[]} contributors
	 */
	public getContributingText (packageJson: IPackageJson, contributors: IContributor[]): string {
		return `\
You are more than welcome to contribute to \`${packageJson.name}\` in any way you please, including:

- Updating documentation.
- Fixing spelling and grammar
- Adding tests
- Fixing issues and suggesting new features
- Blogging, tweeting, and creating tutorials about \`${packageJson.name}\`
${contributors.every(contributor => contributor.twitterHandle == null) ? "" : `- Reaching out to ${contributors.filter(contributor => contributor.twitterHandle != null).map(contributor => `[@${contributor.twitterHandle}](https://twitter.com/${contributor.twitterHandle})`).join(" or")} on Twitter`}
- Submit an issue or a Pull Request`;
	}

	/**
	 * Formats the names of the given contributors
	 * @param {IContributor[]} contributors
	 * @param {boolean} [markdownFormat=false]
	 */
	public formatContributorNames (contributors: IContributor[], markdownFormat: boolean = false): string {
		if (markdownFormat) {
			return contributors.map(contributor => contributor.email == null ? contributor.name : `[${contributor.name}](mailto:${contributor.email})`).join(", ");
		}

		else {
			return contributors.map(contributor => `${contributor.name} ${contributor.email == null ? "" : `<${contributor.email}>`}`).join(", ");
		}
	}
}