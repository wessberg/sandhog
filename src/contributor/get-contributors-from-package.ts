import {Package} from "../package/package";
import {Contributor} from "./contributor";
import {ensureContributor} from "./ensure-contributor";

/**
 * Gets all Contributors based on the given package.json
 * @param {Package} pkg
 * @returns {Contributor[]}
 */
export function getContributorsFromPackage(pkg: Package): Contributor[] {
	const all: Contributor[] = [];

	const includesContributor = (contributor: Contributor) => all.some(({name}) => name === contributor.name);

	if (pkg.author != null) {
		const author = ensureContributor(pkg.author);
		if (!includesContributor(author)) {
			all.push(author);
		}
	}

	if (pkg.authors != null) {
		const authors: Contributor[] = pkg.authors.map(ensureContributor);
		authors.forEach(author => {
			if (!includesContributor(author)) {
				all.push(author);
			}
		});
	}

	if (pkg.contributors != null) {
		const contributors: Contributor[] = pkg.contributors.map(ensureContributor);
		contributors.forEach(contributor => {
			if (!includesContributor(contributor)) {
				all.push(contributor);
			}
		});
	}

	return all;
}
