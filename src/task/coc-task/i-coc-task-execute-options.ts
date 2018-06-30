import {ITaskExecuteOptions} from "../i-task-execute-options";
import {ICocCommandOptions} from "../../command/coc-command/i-coc-command";

export interface ICocTaskExecuteOptions extends ITaskExecuteOptions, ICocCommandOptions {
}