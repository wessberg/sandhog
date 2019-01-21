import {ICommand} from "../command";

export enum ReadmeCommandShortOptionKind {
	RESET = "r",
	BLACKLIST = "b"
}

export enum ReadmeCommandLongOptionKind {
	RESET = "reset",
	BLACKLIST = "blacklist"
}

export interface IReadmeCommandOptions {
	[ReadmeCommandLongOptionKind.RESET]: boolean;
	[ReadmeCommandLongOptionKind.BLACKLIST]: string | true;
}

export interface IReadmeCommand extends ICommand {
	onCommand(args: string[], options: IReadmeCommandOptions): Promise<void>;
}
