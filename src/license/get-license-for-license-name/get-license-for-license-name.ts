import {LicenseName} from "../license-name.js";
import {License} from "../license.js";

/**
 * Gets the License for the given LicenseName
 *
 * @param licenseName
 * @returns
 */
export function getLicenseForLicenseName(licenseName: LicenseName): License {
	switch (licenseName) {
		case "APACHE-2.0":
			return {
				licenseName,
				url: "https://opensource.org/licenses/Apache-2.0",
				badgeUrl: "https://img.shields.io/badge/License-Apache%202.0-blue.svg"
			};

		case "BSD-2-CLAUSE":
			return {
				licenseName,
				url: "https://opensource.org/licenses/BSD-2-Clause",
				badgeUrl: "https://img.shields.io/badge/License-BSD%202--Clause-orange.svg"
			};

		case "BSD-3-CLAUSE":
			return {
				licenseName,
				url: "https://opensource.org/licenses/BSD-3-Clause",
				badgeUrl: "https://img.shields.io/badge/License-BSD%203--Clause-blue.svg"
			};

		case "CC-BY-4.0":
			return {
				licenseName,
				url: "https://creativecommons.org/licenses/by/4.0/",
				badgeUrl: "https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg"
			};

		case "CC-BY-SA-4.0":
			return {
				licenseName,
				url: "https://creativecommons.org/licenses/by-sa/4.0/",
				badgeUrl: "https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg"
			};

		case "EPL-1.0":
			return {
				licenseName,
				url: "https://opensource.org/licenses/EPL-1.0",
				badgeUrl: "https://img.shields.io/badge/License-EPL%201.0-red.svg"
			};

		case "GPL-3.0":
			return {
				licenseName,
				url: "https://img.shields.io/badge/License-GPL%20v3-blue.svg",
				badgeUrl: "https://www.gnu.org/licenses/gpl-3.0"
			};

		case "GPL-2.0":
			return {
				licenseName,
				url: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html",
				badgeUrl: "https://img.shields.io/badge/License-GPL%20v2-blue.svg"
			};

		case "AGPL-3.0":
			return {
				licenseName,
				url: "https://www.gnu.org/licenses/agpl-3.0",
				badgeUrl: "https://img.shields.io/badge/License-AGPL%20v3-blue.svg"
			};

		case "LGPL-3.0":
			return {
				licenseName,
				url: "https://www.gnu.org/licenses/lgpl-3.0",
				badgeUrl: "https://img.shields.io/badge/License-LGPL%20v3-blue.svg"
			};

		case "MIT":
			return {
				licenseName,
				url: "https://opensource.org/licenses/MIT",
				badgeUrl: "https://img.shields.io/badge/License-MIT-yellow.svg"
			};

		case "MPL-2.0":
			return {
				licenseName,
				url: "https://opensource.org/licenses/MPL-2.0",
				badgeUrl: "https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg"
			};

		case "ARTISTIC-2.0":
			return {
				licenseName,
				url: "https://opensource.org/licenses/Artistic-2.0",
				badgeUrl: "https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg"
			};

		case "ZLIB":
			return {
				licenseName,
				url: "https://opensource.org/licenses/Zlib",
				badgeUrl: "https://img.shields.io/badge/License-Zlib-lightgrey.svg"
			};
	}
}
