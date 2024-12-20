import type {LicenseName} from "./license-name.js";
import {LICENSE_NAMES} from "./license-name.js";

/**
 * Ensures that the given license is a proper known LicenseName
 *
 * @param license
 * @returns
 */
export function isKnownLicenseName(license: string): license is LicenseName {
	return LICENSE_NAMES.some(knownLicense => knownLicense === license);
}
