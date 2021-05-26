import {getKeysForEnum} from "./get-keys-for-enum";

/**
 * A function that extracts all property names from the given enumeration.
 */
export function getValuesForEnum<T>(enumeration: T): T[keyof T][] {
	// Take all keys that doesn't start with a digit
	const keys = getKeysForEnum(enumeration);
	return Object.entries(enumeration)
		.filter(([key]) => keys.includes(key as keyof T))
		.map(([, value]) => value);
}
