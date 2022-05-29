import {LicenseName} from "../license-name.js";
import {GenerateLicenseOptions} from "./generate-license-options.js";
import {isKnownLicenseName} from "../is-known-license-name.js";
import {generate as apache2} from "./licenses/generate-apache-2.0.js";
import {generate as agpl} from "./licenses/generate-agpl-3.0.js";
import {generate as mit} from "./licenses/generate-mit.js";
import {generate as artistic2} from "./licenses/generate-artistic-2.0.js";
import {generate as bsd2} from "./licenses/generate-bsd-2-clause.js";
import {generate as bsd3} from "./licenses/generate-bsd-3-clause.js";
import {generate as ccby4} from "./licenses/generate-cc-by-4.0.js";
import {generate as ccbysa4} from "./licenses/generate-cc-by-sa-4.0.js";
import {generate as epl1} from "./licenses/generate-epl-1.0.js";
import {generate as gpl2} from "./licenses/generate-gpl-2.0.js";
import {generate as gpl3} from "./licenses/generate-gpl-3.0.js";
import {generate as lgpl3} from "./licenses/generate-lgpl-3.0.js";
import {generate as mpl2} from "./licenses/generate-mpl-2.0.js";
import {generate as zlib} from "./licenses/generate-zlib.js";

/**
 * Generates license text for the given license name
 */
export async function generateLicense(license: LicenseName, options: GenerateLicenseOptions): Promise<string> {
	if (!isKnownLicenseName(license)) {
		throw new TypeError(`The given license: '${license}' is invalid or not supported`);
	}

	// Lazy-load the generate function to use
	const generate = await (async () => {
		switch (license) {
			case "APACHE-2.0":
				return apache2;

			case "AGPL-3.0":
				return agpl;

			case "MIT":
				return mit;

			case "ARTISTIC-2.0":
				return artistic2;

			case "BSD-2-CLAUSE":
				return bsd2;

			case "BSD-3-CLAUSE":
				return bsd3;

			case "CC-BY-4.0":
				return ccby4;

			case "CC-BY-SA-4.0":
				return ccbysa4;

			case "EPL-1.0":
				return epl1;

			case "GPL-2.0":
				return gpl2;

			case "GPL-3.0":
				return gpl3;

			case "LGPL-3.0":
				return lgpl3;

			case "MPL-2.0":
				return mpl2;

			case "ZLIB":
				return zlib;
		}
	})();

	// Call the generate function with the options
	return generate(options);
}
