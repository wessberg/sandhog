import {rawlist} from "@inquirer/prompts";

/**
 * Provides a "radio button group" of potential options the user may pick
 */
export async function radio<T extends string>(message: string, items: T[] | readonly T[]): Promise<T> {
	const answer = await rawlist({
		message,
		choices: items.map(item => ({name: item, value: item}))
	});

	return answer;
}
