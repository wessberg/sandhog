import {CommandBase} from "../command-base";
import {IContributingCommand, IContributingCommandOptions} from "./i-contributing-command";
import {ICommandOption} from "../i-command-option";
import {ContributingTaskWrapper} from "../../task/contributing-task/i-contributing-task";

/**
 * A command that generates a CONTRIBUTING.md file and adds it to the package
 */
export class ContributingCommand extends CommandBase implements IContributingCommand {
	/**
	 * The command name
	 * @type {string}
	 */
	public readonly shortName: string = "contributing";
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

	constructor(private readonly contributingTaskWrapper: ContributingTaskWrapper) {
		super();
	}

	/**
	 * Invoked when a command is received with options
	 * @param {string[]} _args
	 * @param {IContributingCommandOptions} options
	 * @returns {Promise<void>}
	 */
	public async onCommand(_args: string[], options: IContributingCommandOptions): Promise<void> {
		await this.contributingTaskWrapper().execute(options);
	}
}
