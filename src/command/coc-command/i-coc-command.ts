import {ICommand} from "../command";

export enum CocCommandShortOptionKind {}

export enum CocCommandLongOptionKind {}

export interface ICocCommandOptions {}

export interface ICocCommand extends ICommand {
	onCommand(args: string[], options: ICocCommandOptions): Promise<void>;
}
