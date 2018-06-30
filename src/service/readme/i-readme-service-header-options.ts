import {IContributor, IBacker, IPackageJson} from "../../package-json/i-package-json";
import {LicenseName} from "../license/license-name";

export interface IReadmeServiceHeaderOptions {
	packageJson: IPackageJson;
	backers: { [kind: string]: IBacker[] };
	contributors: IContributor[];
	license: LicenseName;
	blacklist: string[];
}