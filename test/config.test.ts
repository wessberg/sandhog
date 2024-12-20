import test from "node:test";
import assert from "node:assert";
import {Logger} from "../src/logger/logger.js";
import {LogLevelKind} from "../src/logger/log-level-kind.js";
import {getConfig} from "../src/config/get-config/get-config.js";

test("Can sanitize a SandhogConfig", async () => {
	const config = await getConfig({
		root: process.cwd(),
		logger: new Logger(LogLevelKind.NONE)
	});

	// Verify that it has no optional keys
	assert(
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
