import {LicenseName} from "../license-name";
import {GenerateLicenseOptions} from "./generate-license-options";
import {isKnownLicenseName} from "../is-known-license-name";

/**
 * Generates license text for the given license name
 * @param {LicenseName} license
 * @param {GenerateLicenseOptions} options
 * @returns {Promise<string>}
 */
export async function generateLicense(license: LicenseName, options: GenerateLicenseOptions): Promise<string> {
	if (!isKnownLicenseName(license)) {
		throw new TypeError(`The given license: '${license}' is invalid or not supported`);
	}

	// Lazy-load the generate function to use
	const {generate} = await (async () => {
		switch (license) {
			case "APACHE-2.0":
				return await import("./licenses/generate-apache-2.0");

			case "AGPL-3.0":
				return await import("./licenses/generate-agpl-3.0");

			case "MIT":
				return await import("./licenses/generate-mit");

			case "ARTISTIC-2.0":
				return await import("./licenses/generate-artistic-2.0");

			case "BSD-2-CLAUSE":
				return await import("./licenses/generate-bsd-2-clause");

			case "BSD-3-CLAUSE":
				return await import("./licenses/generate-bsd-3-clause");

			case "CC-BY-4.0":
				return await import("./licenses/generate-cc-by-4.0");

			case "CC-BY-SA-4.0":
				return await import("./licenses/generate-cc-by-sa-4.0");

			case "EPL-1.0":
				return await import("./licenses/generate-epl-1.0");

			case "GPL-2.0":
				return await import("./licenses/generate-gpl-2.0");

			case "GPL-3.0":
				return await import("./licenses/generate-gpl-3.0");

			case "LGPL-3.0":
				return await import("./licenses/generate-lgpl-3.0");

			case "MPL-2.0":
				return await import("./licenses/generate-mpl-2.0");

			case "ZLIB":
				return await import("./licenses/generate-zlib");
		}
	})();

	// Call the generate function with the options
	return generate(options);
}
