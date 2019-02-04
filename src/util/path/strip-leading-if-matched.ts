/**
 * Strips the leading part of the given string if it is equal to the given match.
 * @param {string} str
 * @param {string} match
 * @returns {string}
 */
export function stripLeadingIfMatched(str: string, match: string): string {
	const encodedMatch = encodeURIComponent(match);
	if (str.startsWith(match)) return str.slice(match.length);
	else if (str.startsWith(encodedMatch)) return str.slice(encodedMatch.length);
	return str;
}
