import {FindPackageOptions} from "../../package/find-package/find-package-options";
import {FileSystem} from "../../file-system/file-system";
import {Package} from "../../package/package";

export interface FindCodeStylesOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync">;
}
