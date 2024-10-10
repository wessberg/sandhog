import type {Contributor} from "../../contributor/contributor.js";
import type prettier from "prettier";
import type {SandhogConfig} from "../../config/sandhog-config.js";
import type {Package} from "../../package/package.js";

export interface GenerateContributingOptions {
	prettier: typeof prettier;
	pkg: Package;
	config: SandhogConfig;
	contributors: Contributor[];
}
