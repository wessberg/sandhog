import commander from "commander";

commander.parse(process.argv);
const lastArgv = process.argv.slice(-1)[0];
if (lastArgv.endsWith("scaffold")) {
	// Show help if no arguments are given
	if (commander.args.length === 0) {
		commander.help(text => {
			return `Welcome to Scaffold!\n\n` + text;
		});
	}
}
