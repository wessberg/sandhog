import {ITaskExecuteOptions} from "./i-task-execute-options";

export interface ITask {
	execute (options: ITaskExecuteOptions): Promise<void>;
}