import {ITaskExecuteOptions} from "../i-task-execute-options";
import {ILicenseCommandOptions} from "../../command/license-command/i-license-command";

export interface ILicenseTaskExecuteOptions extends ITaskExecuteOptions, ILicenseCommandOptions {}
