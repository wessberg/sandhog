import type {FindPackageOptions} from "../../package/find-package/find-package-options.js";
import {type FileSystem} from "../../file-system/file-system.js";
import type {Package} from "../../package/package.js";

export interface FindCodeStylesOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
}
