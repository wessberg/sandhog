import {IPackageJson} from "../../package-json/i-package-json";

export interface IProjectServiceGetPackageJsonResult {
	path: string;
	packageJson: IPackageJson;
}