import * as commander from "commander";
import {ICommandContainer} from "./i-command-container";
import {Commands} from "./commands";

/**
 * A command contains a command line command
 */
export class CommandContainer implements ICommandContainer {

	constructor (commands: Commands) {
		commands.forEach(command => command.prepare());
	}

	/**
	 * Parses and runs all registered commands depending on the command line input
	 */
	public run (): void {

		// Parse the command line content
		commander.parse(process.argv);
	}
}