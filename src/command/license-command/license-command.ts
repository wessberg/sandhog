import {CommandBase} from "../command-base";
import {ILicenseCommand, ILicenseCommandOptions} from "./i-license-command";
import {ICommandOption} from "../i-command-option";
import {LicenseTaskWrapper} from "../../task/license-task/i-license-task";

/**
 * A command that generates a license file and adds it to the package
 */
export class LicenseCommand extends CommandBase implements ILicenseCommand {
	/**
	 * The command name
	 * @type {string}
	 */
	public readonly shortName: string = "license";
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

	constructor(private readonly licenseTaskWrapper: LicenseTaskWrapper) {
		super();
	}

	/**
	 * Invoked when a command is received with options
	 * @param {string[]} _args
	 * @param {ILicenseCommandOptions} options
	 * @returns {Promise<void>}
	 */
	public async onCommand(_args: string[], options: ILicenseCommandOptions): Promise<void> {
		await this.licenseTaskWrapper().execute(options);
	}
}
