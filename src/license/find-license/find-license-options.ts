import {Package} from "../../package/package";
import {FindPackageOptions} from "../../package/find-package/find-package-options";
import {FileSystem} from "../../file-system/file-system";

export interface FindLicenseOptions extends FindPackageOptions {
	pkg?: Package;
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
}
