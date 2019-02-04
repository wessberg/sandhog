import {Contributor} from "../../contributor/contributor";
import prettier from "prettier";
import {ScaffoldConfig} from "../../config/scaffold-config";
import {Package} from "../../package/package";

export interface GenerateContributingOptions {
	prettier: typeof prettier;
	pkg: Package;
	config: ScaffoldConfig;
	contributors: Contributor[];
}
