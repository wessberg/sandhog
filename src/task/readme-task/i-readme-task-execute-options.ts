import {ITaskExecuteOptions} from "../i-task-execute-options";
import {IReadmeCommandOptions} from "../../command/readme-command/i-readme-command";

export interface IReadmeTaskExecuteOptions extends ITaskExecuteOptions, IReadmeCommandOptions {
}