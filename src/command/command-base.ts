import * as commander from "commander";
import {ICommand} from "./command";
import {ICommandOption} from "./i-command-option";

// tslint:disable

/**
 * A command contains a command line command
 */
export abstract class CommandBase implements ICommand {
	/**
	 * The description for the command
	 * @type {string}
	 */
	public abstract readonly description: string;

	/**
	 * All contents of a command beside its' short name
	 * @type {string}
	 */
	public abstract readonly command: string | undefined;

	/**
	 * The name of the command (such as 'create')
	 * @type {string}
	 */
	public abstract readonly shortName: string;

	/**
	 * All of the options that can be given to the command
	 * @type {ICommandOption[]}
	 */
	public abstract readonly options: ICommandOption[];

	/**
	 * Invoked when the action is triggered from the command line
	 * @type {...*[]} args
	 */
	public abstract onCommand(...args: any[]): Promise<void>;

	/**
	 * Prepares the command
	 */
	public prepare(): void {
		// Initialize the command
		const result = commander.command(`${this.shortName}${this.command == null || this.command.length < 1 ? "" : ` ${this.command}`}`, this.description);

		// Add all of the options to it
		this.options.forEach(option => result.option(this.formatCommandOption(option), option.description, option.defaultValue));

		result.action(this.beforeCommand.bind(this));
	}

	/**
	 * Invoked when a command happens
	 * @param {...*[]} rest
	 */
	private beforeCommand(...rest: any[]): void {
		// The last provided argument will contain the options. All prior arguments minus the first one will include options given to the command
		const options = rest.length === 1 ? rest[0] : rest[rest.length - 1];
		const args = rest.length === 1 ? [] : rest.slice(0, rest.length - 1);

		// Set all default values on the options if they aren't there already
		this.options.forEach(option => {
			if (!(option.longOption in options)) {
				options[option.longOption] = option.defaultValue;
			}
		});

		// Invoke the appropriate command handler
		this.onCommand(args, options).then();
	}

	/**
	 * Formats a command option
	 * @param {string} longOption
	 * @param {string} shortOption
	 * @returns {string}
	 */
	private formatCommandOption({longOption, shortOption}: ICommandOption): string {
		if (longOption != null && shortOption != null) {
			return `-${shortOption}, --${longOption}`;
		} else if (longOption != null) {
			return `-${shortOption}`;
		} else {
			return `--${longOption}`;
		}
	}
}
