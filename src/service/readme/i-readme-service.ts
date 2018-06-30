import {IReadmeServiceResetResult} from "./i-readme-service-reset-result";
import {IReadmeServiceResetOptions} from "./i-readme-service-reset-options";
import {IReadmeServiceUpgradeOptions} from "./i-readme-service-upgrade-options";
import {IReadmeServiceUpgradeResult} from "./i-readme-service-upgrade-result";

export interface IReadmeService {
	reset (options: IReadmeServiceResetOptions): Promise<IReadmeServiceResetResult>;
	upgrade (options: IReadmeServiceUpgradeOptions): Promise<IReadmeServiceUpgradeResult>;
}