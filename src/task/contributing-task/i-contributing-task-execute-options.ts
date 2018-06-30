import {ITaskExecuteOptions} from "../i-task-execute-options";
import {IContributingCommandOptions} from "../../command/contributing-command/i-contributing-command";

export interface IContributingTaskExecuteOptions extends ITaskExecuteOptions, IContributingCommandOptions {
}