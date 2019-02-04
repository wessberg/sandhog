import {Contributor} from "./contributor";

const NAME_REGEXP = /([^<]*)/;
const NAME_EMAIL_REGEXP = /([^<]*)<([^>]*)>/;
const NAME_URL_REGEXP = /([^(]*)\s*\(([^)]*\))/;
const NAME_EMAIL_URL_REGEXP = /([^<]*)<([^>]*)>\s*\(([^)]*\))/;

/**
 * Ensures that the given input is a proper Contributor
 * @param {Contributor} contributor
 */
export function ensureContributor(contributor: string | Contributor): Contributor {
	if (typeof contributor !== "string") return contributor;

	// Otherwise, try to parse the string which may look like this:
	// "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"
	if (NAME_EMAIL_URL_REGEXP.test(contributor)) {
		const [, name, email, url] = contributor.match(NAME_EMAIL_URL_REGEXP)!;
		return {
			name: name.trim(),
			email,
			url
		};
	} else if (NAME_URL_REGEXP.test(contributor)) {
		const [, name, url] = contributor.match(NAME_URL_REGEXP)!;
		return {
			name: name.trim(),
			url
		};
	} else if (NAME_EMAIL_REGEXP.test(contributor)) {
		const [, name, email] = contributor.match(NAME_EMAIL_REGEXP)!;
		return {
			name: name.trim(),
			email
		};
	} else if (NAME_REGEXP.test(contributor)) {
		const [, name] = contributor.match(NAME_REGEXP)!;
		return {
			name: name.trim()
		};
	} else {
		throw new TypeError(`Could not parse string: '${contributor}' as a contributor`);
	}
}
