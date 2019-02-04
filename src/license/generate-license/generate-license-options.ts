import prettier from "prettier";
import {ScaffoldConfig} from "../../config/scaffold-config";
import {Contributor} from "../../contributor/contributor";
import {Package} from "../../package/package";

export interface GenerateLicenseOptions {
	prettier: typeof prettier;
	config: ScaffoldConfig;
	pkg: Package;
	contributors: Contributor[];
}
