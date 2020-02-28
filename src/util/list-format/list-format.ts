/**
 * Formats the given iterable of strings in a list format (in the English locale)
 *
 * @param elements
 * @param andOrOr
 */
export function listFormat(elements: Iterable<string>, andOrOr: "and" | "or"): string {
	const arr = [...elements];
	if (arr.length === 0) return "";
	else if (arr.length === 1) return arr[0];
	else {
		const head = arr.slice(0, arr.length - 1);
		const last = arr.slice(-1)[0];
		return `${head.join(", ")}, ${andOrOr} ${last}`;
	}
}
