import {Package} from "../package";

export interface FindPackageResult {
	pkg: Package;
	root: string;
}
