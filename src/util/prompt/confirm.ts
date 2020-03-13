import {prompt} from "inquirer";

/**
 * Prints a 'confirm' prompt in the terminal
 */
export async function confirm(message: string, defaultValue?: boolean): Promise<boolean> {
	const answer = await prompt([
		{
			type: "confirm",
			message,
			name: "confirm",
			default: defaultValue
		}
	]);

	return answer.confirm;
}
