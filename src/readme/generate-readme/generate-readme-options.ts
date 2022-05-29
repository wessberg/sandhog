import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config.js";
import {Package} from "../../package/package.js";
import {ILogger} from "../../logger/i-logger.js";
import {FileSystem} from "../../file-system/file-system.js";

export interface GenerateReadmeOptions {
	prettier: typeof prettier;
	pkg: Package;
	logger: ILogger;
	root: string;
	fs: Pick<FileSystem, "existsSync" | "readFileSync">;
	config: SandhogConfig;
	existingReadme?: string;
}
