import {ITask} from "../i-task";
import {ICocTaskExecuteOptions} from "./i-coc-task-execute-options";

export interface ICocTask extends ITask {
	execute (options: ICocTaskExecuteOptions): Promise<void>;
}

export declare type CocTaskWrapper = () => ICocTask;