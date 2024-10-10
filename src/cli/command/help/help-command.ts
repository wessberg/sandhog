import type {Command} from "commander";

export function createHelpCommand(program: Command): void {
	program.addHelpText("before", `Welcome to Sandhog!\n`);
	program.addHelpText(
		"after",
		`

Example call:
  $ sandhog readme --yes`
	);
}
