import {ITask} from "../i-task";
import {IReadmeTaskExecuteOptions} from "./i-readme-task-execute-options";

export interface IReadmeTask extends ITask {
	execute (options: IReadmeTaskExecuteOptions): Promise<void>;
}

export declare type ReadmeTaskWrapper = () => IReadmeTask;