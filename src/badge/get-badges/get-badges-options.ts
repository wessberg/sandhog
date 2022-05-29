import {Package} from "../../package/package.js";
import {SandhogConfig} from "../../config/sandhog-config.js";
import {FindLicenseOptions} from "../../license/find-license/find-license-options.js";

export interface GetBadgesOptions extends FindLicenseOptions {
	pkg: Package;
	config: SandhogConfig;
}
