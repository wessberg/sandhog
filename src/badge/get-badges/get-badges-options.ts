import {Package} from "../../package/package";
import {SandhogConfig} from "../../config/sandhog-config";
import {FindLicenseOptions} from "../../license/find-license/find-license-options";

export interface GetBadgesOptions extends FindLicenseOptions {
	pkg: Package;
	config: SandhogConfig;
}
