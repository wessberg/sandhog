import {FindPackageOptions} from "../../package/find-package/find-package-options.js";
import {FileSystem} from "../../file-system/file-system.js";
import {Package} from "../../package/package.js";

export interface FindCodeStylesOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync"|"readFileSync">;
}
