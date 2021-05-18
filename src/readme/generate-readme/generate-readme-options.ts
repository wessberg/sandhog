import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config";
import {Package} from "../../package/package";
import {ILogger} from "../../logger/i-logger";
import {FileSystem} from "../../file-system/file-system";

export interface GenerateReadmeOptions {
	prettier: typeof prettier;
	pkg: Package;
	logger: ILogger;
	root: string;
	fs: Pick<FileSystem, "existsSync" | "readFileSync">;
	config: SandhogConfig;
	existingReadme?: string;
}
