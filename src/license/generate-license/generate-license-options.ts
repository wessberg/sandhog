import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config.js";
import {Contributor} from "../../contributor/contributor.js";
import {Package} from "../../package/package.js";

export interface GenerateLicenseOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	pkg: Package;
	contributors: Contributor[];
}
