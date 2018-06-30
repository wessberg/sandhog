// tslint:disable

import {ICommandOption} from "./i-command-option";

export interface ICommand {
	description: string;
	command?: string;
	shortName: string;
	options: ICommandOption[];
	onCommand (...args: any[]): Promise<void>;
	prepare (): void;
}