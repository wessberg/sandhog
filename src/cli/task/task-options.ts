import {Package} from "../../package/package.js";
import {SandhogConfig} from "../../config/sandhog-config.js";
import {ILogger} from "../../logger/i-logger.js";
import prettier from "prettier";
import {FileSystem} from "../../file-system/file-system.js";

export interface TaskOptions {
	yes: boolean;
	root: string;
	pkg: Package;
	config: SandhogConfig;
	logger: ILogger;
	prettier: typeof prettier;
	fs: FileSystem;
}
