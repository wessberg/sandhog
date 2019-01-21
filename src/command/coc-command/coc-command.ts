import {CommandBase} from "../command-base";
import {ICocCommand, ICocCommandOptions} from "./i-coc-command";
import {ICommandOption} from "../i-command-option";
import {CocTaskWrapper} from "../../task/coc-task/i-coc-task";

/**
 * A command that generates a CODE_OF_CONDUCT.md file and adds it to the package
 */
export class CocCommand extends CommandBase implements ICocCommand {
	/**
	 * The command name
	 * @type {string}
	 */
	public readonly shortName: string = "coc";
	/**
	 * The rest of the command, following the short name
	 * @type {string?}
	 */
	public readonly command: string | undefined = undefined;
	/**
	 * The description of the command
	 * @type {string}
	 */
	public readonly description: string = "";
	/**
	 * The options that can be provided to the command
	 * @type {ICommandOption[]}
	 */
	public readonly options: ICommandOption[] = [];

	constructor(private readonly cocTaskWrapper: CocTaskWrapper) {
		super();
	}

	/**
	 * Invoked when a command is received with options
	 * @param {string[]} _args
	 * @param {ICocCommandOptions} options
	 * @returns {Promise<void>}
	 */
	public async onCommand(_args: string[], options: ICocCommandOptions): Promise<void> {
		await this.cocTaskWrapper().execute(options);
	}
}
