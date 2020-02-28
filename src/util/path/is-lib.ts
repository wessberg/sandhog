/**
 * Returns true if the given path represents a library
 *
 * @param path
 * @returns
 */
export function isLib(path: string): boolean {
	return !path.startsWith(".") && !path.startsWith("/");
}
