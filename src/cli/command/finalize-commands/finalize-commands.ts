import program from "commander";

program.parse(process.argv);

// Show help if no arguments are given
if (!program.args.length)
	program.help(text => {
		return `Welcome to Scaffold!\n\n` + text;
	});
