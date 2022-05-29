import {Package} from "../package.js";

export interface FindPackageResult {
	pkg: Package;
	root: string;
}
