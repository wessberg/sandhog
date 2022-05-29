import {Package} from "../../package/package.js";
import {FindPackageOptions} from "../../package/find-package/find-package-options.js";
import {FileSystem} from "../../file-system/file-system.js";

export interface FindLicenseOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
}
