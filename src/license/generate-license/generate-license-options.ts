import type prettier from "prettier";
import type {SandhogConfig} from "../../config/sandhog-config.js";
import type {Contributor} from "../../contributor/contributor.js";
import type {Package} from "../../package/package.js";

export interface GenerateLicenseOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	pkg: Package;
	contributors: Contributor[];
}
