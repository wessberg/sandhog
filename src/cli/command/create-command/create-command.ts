import commander from "commander";
import {CommandAction, CommandActionOptions, CommandOptionType, CreateCommandOptions} from "./create-command-options";

// tslint:disable:no-any

/**
 * Coerces the given option value into an acceptable data type
 * @param {CommandOptionType} type
 * @param {*} value
 */
function coerceOptionValue(
	type: CommandOptionType,
	value: unknown
): typeof type extends "boolean" ? boolean : typeof type extends "number" ? number : string {
	switch (type) {
		case "string":
			if (value === null) return "null";
			else if (value === undefined) return "undefined";
			return String(value);

		case "number":
			if (typeof value === "number") return (value as unknown) as string;
			else if (value === true) return (1 as unknown) as string;
			else if (value === false) return (0 as unknown) as string;
			return (parseFloat(value as string) as unknown) as string;
		case "boolean":
			if (value === "true" || value === "" || value === "1" || value === 1) return (true as unknown) as string;
			else if (value === "false" || value === "0" || value === 0) return (false as unknown) as string;
			return (Boolean(value) as unknown) as string;
	}
}

/**
 * Formats the given option flags
 * @param {string} shortHand
 * @param {string} longHand
 * @returns {string}
 */
function formatOptionFlags(shortHand: string | undefined, longHand: string): string {
	const formattedLongHand = `${longHand} [arg]`;
	return shortHand != null ? `-${shortHand}, --${formattedLongHand}` : `--${formattedLongHand}`;
}

/**
 * Formats the given command name, along with its arguments
 * @param {T} options
 * @returns {string}
 */
function formatCommandNameWithArgs<T extends CreateCommandOptions>(options: T): string {
	const formattedArgs = Object.entries(options.args)
		.map(([argName, {type, required}]) => {
			const left = required ? `<` : `[`;
			const right = required ? ">" : `]`;
			if (type === "string[]") {
				return `${left}${argName}...${right}`;
			} else {
				return `${left}${argName}${right}`;
			}
		})
		.join(" ");
	return `${options.name} ${formattedArgs}`;
}

/**
 * Creates a new command
 * @param {T} options
 * @param {CommandAction<T>} action
 */
export function createCommand<T extends CreateCommandOptions>(options: T, action: CommandAction<T>): void {
	// Add the command to the program
	const result = commander.command(formatCommandNameWithArgs(options)).description(options.description);

	// Add options to the command
	Object.entries(options.options).forEach(([longhand, {shortHand, description, type, defaultValue}]) => {
		result.option(formatOptionFlags(shortHand, longhand), description, coerceOptionValue.bind(null, type), defaultValue);
	});

	// Add the action to the command
	result.action((...args: unknown[]) => {
		const argKeys = Object.keys(options.args);
		const optionKeys = Object.keys(options.options);
		const actionOptions = {} as CommandActionOptions<T>;
		for (let i = 0; i < args.length; i++) {
			if (argKeys[i] == null) continue;
			actionOptions[argKeys[i] as keyof typeof actionOptions] = args[i] as any;
		}

		// Take the last argument
		const lastArg = args[args.length - 1];
		// Apply all option values
		for (const key of optionKeys) {
			actionOptions[key as keyof typeof actionOptions] = (lastArg as any)[key];
		}

		// Invoke the action
		action(actionOptions);
	});
}
