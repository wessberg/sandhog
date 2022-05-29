import {LicenseName} from "./license-name.js";

export interface License {
	licenseName: LicenseName;
	badgeUrl: string;
	url: string;
}
