import type prettier from "prettier";
import type {SandhogConfig} from "../../config/sandhog-config.js";
import type {Package} from "../../package/package.js";
import type {ILogger} from "../../logger/i-logger.js";
import type {FileSystem} from "../../file-system/file-system.js";

export interface GenerateReadmeOptions {
	prettier: typeof prettier;
	pkg: Package;
	logger: ILogger;
	root: string;
	fs: Pick<FileSystem, "existsSync" | "readFileSync">;
	config: SandhogConfig;
	existingReadme?: string;
}
