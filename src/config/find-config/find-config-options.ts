import type {FindPackageOptions} from "../../package/find-package/find-package-options.js";
import type {Package} from "../../package/package.js";
import type {FileSystem} from "../../file-system/file-system.js";

export interface FindConfigOptions extends FindPackageOptions {
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
	filename?: string;
	pkg?: Package;
}
