import {ICommand} from "../command";

export enum LicenseCommandShortOptionKind {}

export enum LicenseCommandLongOptionKind {}

export interface ILicenseCommandOptions {}

export interface ILicenseCommand extends ICommand {
	onCommand(args: string[], options: ILicenseCommandOptions): Promise<void>;
}
