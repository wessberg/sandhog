/**
 * A function that extracts all property names from the given enumeration.
 * @param {T} enumeration
 * @returns {(keyof T)[]}
 */
export function getKeysForEnum<T>(enumeration: T): (keyof T)[] {
	// Take all keys that doesn't start with a digit
	return Object.keys(enumeration).filter(key => isNaN(parseInt(key[0]))) as (keyof T)[];
}
