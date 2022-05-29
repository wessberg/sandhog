import {Contributor} from "../../contributor/contributor.js";
import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config.js";
import {Package} from "../../package/package.js";

export interface GenerateContributingOptions {
	prettier: typeof prettier;
	pkg: Package;
	config: SandhogConfig;
	contributors: Contributor[];
}
