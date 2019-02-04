import {Package} from "../../package/package";
import {ScaffoldConfig} from "../../config/scaffold-config";
import {ILogger} from "../../logger/i-logger";
import prettier from "prettier";
import {FileSystem} from "../../file-system/file-system";

export interface TaskOptions {
	yes: boolean;
	root: string;
	pkg: Package;
	config: ScaffoldConfig;
	logger: ILogger;
	prettier: typeof prettier;
	fs: FileSystem;
}
