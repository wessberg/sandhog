import {CommandBase} from "../command-base";
import {IReadmeCommand, IReadmeCommandOptions, ReadmeCommandLongOptionKind, ReadmeCommandShortOptionKind} from "./i-readme-command";
import {ICommandOption} from "../i-command-option";
import {ReadmeTaskWrapper} from "../../task/readme-task/i-readme-task";

/**
 * A command that generates or upgrades a README.md file
 */
export class ReadmeCommand extends CommandBase implements IReadmeCommand {

	/**
	 * The command name
	 * @type {string}
	 */
	public readonly shortName: string = "readme";
	/**
	 * The rest of the command, following the short name
	 * @type {string?}
	 */
	public readonly command: string|undefined = undefined;
	/**
	 * The description of the command
	 * @type {string}
	 */
	public readonly description: string = "";
	/**
	 * The options that can be provided to the command
	 * @type {ICommandOption[]}
	 */
	public readonly options: ICommandOption[] = [
		{
			shortOption: ReadmeCommandShortOptionKind.RESET,
			longOption: ReadmeCommandLongOptionKind.RESET,
			description: "If this option is given, a new README will be generated",
			defaultValue: false
		},
		{
			shortOption: ReadmeCommandShortOptionKind.BLACKLIST,
			longOption: `${ReadmeCommandLongOptionKind.BLACKLIST} [kinds]`,
			description: "If this option is given, the headers provided in the blacklist won't be added to the README if missing"
		}
	];

	constructor (private readonly readmeTaskWrapper: ReadmeTaskWrapper) {
		super();
	}

	/**
	 * Invoked when a command is received with options
	 * @param {string[]} _args
	 * @param {IReadmeCommandOptions} options
	 * @returns {Promise<void>}
	 */
	public async onCommand (_args: string[], options: IReadmeCommandOptions): Promise<void> {
		await this.readmeTaskWrapper().execute(options);
	}
}