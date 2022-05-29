import {ILogger} from "../../logger/i-logger.js";
import {FileSystem} from "../../file-system/file-system.js";

export interface FindPackageOptions {
	root?: string;
	fs?: Pick<FileSystem, "existsSync"|"readFileSync">;
	logger: ILogger;
}
