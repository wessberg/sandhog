import {IPackageJson} from "../../package-json/i-package-json";
import {IReadmeServiceBaseOptions} from "./i-readme-service-base-options";

export interface IReadmeServiceResetOptions extends IReadmeServiceBaseOptions {
	packageJson: IPackageJson;
}
