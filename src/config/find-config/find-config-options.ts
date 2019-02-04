import {FindPackageOptions} from "../../package/find-package/find-package-options";
import {Package} from "../../package/package";
import {FileSystem} from "../../file-system/file-system";

export interface FindConfigOptions extends FindPackageOptions {
	fs?: Pick<FileSystem, "existsSync" | "readFileSync">;
	filename?: string;
	pkg?: Package;
}
