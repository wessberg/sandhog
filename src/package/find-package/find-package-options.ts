import type {ILogger} from "../../logger/i-logger.js";
import type {FileSystem} from "../../file-system/file-system.js";

export interface FindPackageOptions {
	root?: string;
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
	logger: ILogger;
}
