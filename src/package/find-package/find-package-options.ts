import {ILogger} from "../../logger/i-logger";
import {FileSystem} from "../../file-system/file-system";

export interface FindPackageOptions {
	root?: string;
	fs?: Pick<FileSystem, "existsSync">;
	logger: ILogger;
}
