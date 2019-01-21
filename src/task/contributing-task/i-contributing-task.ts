import {ITask} from "../i-task";
import {IContributingTaskExecuteOptions} from "./i-contributing-task-execute-options";

export interface IContributingTask extends ITask {
	execute(options: IContributingTaskExecuteOptions): Promise<void>;
}

export declare type ContributingTaskWrapper = () => IContributingTask;
