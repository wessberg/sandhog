import type {Package} from "../../package/package.js";
import type {FindPackageOptions} from "../../package/find-package/find-package-options.js";
import type {FileSystem} from "../../file-system/file-system.js";

export interface FindLicenseOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
}
