import {ITask} from "../i-task";
import {ILicenseTaskExecuteOptions} from "./i-license-task-execute-options";

export interface ILicenseTask extends ITask {
	execute (options: ILicenseTaskExecuteOptions): Promise<void>;
}

export declare type LicenseTaskWrapper = () => ILicenseTask;