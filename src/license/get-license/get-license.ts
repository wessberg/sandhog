import {GetLicenseOptions} from "./get-license-options";
import {LICENSE_NAMES, LicenseName} from "../license-name";
import {radio} from "../../util/prompt/radio";
import {findLicense} from "../find-license/find-license";

/**
 * Finds the project license from the given root directory.
 * It may be listed in the package.json file, or it may exist within the root as a LICENSE.md file already.
 * If no such file can be found, it will be request one from the user
 *
 * @param options
 * @returns
 */
export async function getLicense(options: GetLicenseOptions): Promise<LicenseName> {
	const license = await findLicense(options);

	// If no license could be found, ask the user to select one
	if (license == null) {
		return await radio(`No license could be found. Which one would you like to use?`, LICENSE_NAMES);
	} else {
		return license;
	}
}
