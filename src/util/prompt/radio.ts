import inquirer from "inquirer";

/**
 * Provides a "radio button group" of potential options the user may pick
 */
export async function radio<T extends string>(message: string, items: T[] | readonly T[]): Promise<T> {
	const answer = await inquirer.prompt([
		{
			type: "rawlist",
			message,
			name: "rawlist",
			choices: items.map(item => ({name: item}))
		}
	]);

	return answer.rawlist;
}
