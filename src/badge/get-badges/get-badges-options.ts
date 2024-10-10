import type {Package} from "../../package/package.js";
import type {SandhogConfig} from "../../config/sandhog-config.js";
import type {FindLicenseOptions} from "../../license/find-license/find-license-options.js";

export interface GetBadgesOptions extends FindLicenseOptions {
	pkg: Package;
	config: SandhogConfig;
}
