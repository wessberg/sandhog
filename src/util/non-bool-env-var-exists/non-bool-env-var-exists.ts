/**
 * Returns true if the given (non-boolean) environment variable exists
 * @param {string | null} variable
 * @returns {boolean}
 */
export function nonBoolEnvVarExists (variable: string|null): boolean {
	return variable != null && variable !== "";
}