import {ICommand} from "../command";

export enum ContributingCommandShortOptionKind {
}

export enum ContributingCommandLongOptionKind {
}

export interface IContributingCommandOptions {
}

export interface IContributingCommand extends ICommand {
	onCommand (args: string[], options: IContributingCommandOptions): Promise<void>;
}