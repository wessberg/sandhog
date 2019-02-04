import test from "ava";
import {getConfig} from "../../src/config/get-config/get-config";
import {Logger} from "../../src/logger/logger";
import {LogLevel} from "../../src/logger/log-level";

test("Can sanitize a ScaffoldConfig", async t => {
	const config = await getConfig({
		root: process.cwd(),
		logger: new Logger(LogLevel.NONE)
	});

	// Verify that it has no optional keys
	t.true(
		"donate" in config &&
			"patreon" in config.donate &&
			"userId" in config.donate.patreon &&
			"openCollective" in config.donate &&
			"project" in config.donate.openCollective &&
			"prettier" in config &&
			"logo" in config &&
			"url" in config.logo &&
			"height" in config.logo &&
			"featureImage" in config &&
			"url" in config.featureImage &&
			"height" in config.featureImage &&
			"readme" in config &&
			"badges" in config.readme &&
			"sections" in config.readme &&
			"exclude" in config.readme.badges &&
			"exclude" in config.readme.sections
	);
});
