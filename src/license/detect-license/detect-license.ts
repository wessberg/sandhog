import {LicenseName} from "../license-name.js";

/**
 * Detects the license of the given text, if possible
 *
 * @param text
 * @returns
 */
export function detectLicense(text: string): LicenseName | undefined {
	if (text.includes("GNU AGPL")) return "AGPL-3.0";
	else if (text.includes("Apache License")) return "APACHE-2.0";
	else if (text.includes("The Artistic License 2.0")) return "ARTISTIC-2.0";
	else if (text.includes("BSD 2-Clause License")) return "BSD-2-CLAUSE";
	else if (text.includes("BSD 3-Clause License")) return "BSD-3-CLAUSE";
	else if (text.includes("Attribution 4.0 International")) return "CC-BY-4.0";
	else if (text.includes("Attribution-ShareAlike 4.0 International")) return "CC-BY-SA-4.0";
	else if (text.includes("Eclipse Public License")) return "EPL-1.0";
	else if (text.includes("GNU GENERAL PUBLIC LICENSE") && text.includes("Version 2, June 1991")) return "GPL-2.0";
	else if (text.includes("GNU GENERAL PUBLIC LICENSE") && text.includes("Version 3, 29 June 2007")) return "GPL-3.0";
	else if (text.includes("GNU LESSER GENERAL PUBLIC LICENSE") && text.includes("Version 3, 29 June 2007")) return "LGPL-3.0";
	else if (text.includes("The MIT License (MIT)")) return "MIT";
	else if (text.includes("Mozilla Public License Version 2.0")) return "MPL-2.0";
	else if (text.includes("zlib License")) return "ZLIB";
	else return undefined;
}
