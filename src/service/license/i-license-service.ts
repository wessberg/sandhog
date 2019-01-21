import {ILicense} from "./i-license";
import {LicenseName} from "./license-name";
import {IContributor, IPackageJson} from "../../package-json/i-package-json";

export interface ILicenseService {
	getLicense(name: string): ILicense;
	generateLicenseText(name: LicenseName, packageJson: IPackageJson, contributors: IContributor[]): string;
}
