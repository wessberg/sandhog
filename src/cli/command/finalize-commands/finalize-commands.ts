import commander from "commander";

commander.parse(process.argv);
const lastArgv = process.argv.slice(-1)[0];
if (lastArgv.endsWith("scaffold") && commander.args.length === 0) {
	// Show help if no arguments are given
	commander.help(text => {
		return `Welcome to Scaffold!\n\n` + text;
	});
}
