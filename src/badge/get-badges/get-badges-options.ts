import {Package} from "../../package/package";
import {ScaffoldConfig} from "../../config/scaffold-config";
import {FindLicenseOptions} from "../../license/find-license/find-license-options";

export interface GetBadgesOptions extends FindLicenseOptions {
	pkg: Package;
	config: ScaffoldConfig;
}
