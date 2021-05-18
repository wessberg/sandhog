import commander from "commander";

commander.parse(process.argv);
const lastArgv = process.argv.slice(-1)[0];
if (lastArgv.endsWith("sandhog") && commander.args.length === 0) {
	// Show help if no arguments are given
	commander.help(text => `Welcome to Sandhog!\n\n` + text);
}
