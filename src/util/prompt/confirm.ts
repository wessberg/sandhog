import {confirm as inquirerConfirm} from "@inquirer/prompts";

/**
 * Prints a 'confirm' prompt in the terminal
 */
export async function confirm(message: string, defaultValue?: boolean): Promise<boolean> {
	const answer = await inquirerConfirm({
		message,
		default: defaultValue
	});

	return answer;
}
