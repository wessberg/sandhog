import type {Package} from "../../package/package.js";
import type {SandhogConfig} from "../../config/sandhog-config.js";
import type {ILogger} from "../../logger/i-logger.js";
import type prettier from "prettier";
import type {FileSystem} from "../../file-system/file-system.js";

export interface TaskOptions {
	yes: boolean;
	root: string;
	pkg: Package;
	config: SandhogConfig;
	logger: ILogger;
	prettier: typeof prettier;
	fs: FileSystem;
}
