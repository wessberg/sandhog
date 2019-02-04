import {LICENSE_NAMES, LicenseName} from "./license-name";

/**
 * Ensures that the given license is a proper known LicenseName
 * @param {string} license
 * @returns {LicenseName}
 */
export function isKnownLicenseName(license: string): license is LicenseName {
	return LICENSE_NAMES.some(knownLicense => knownLicense === license);
}
