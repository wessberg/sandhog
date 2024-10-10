import type {Contributor} from "../../contributor/contributor.js";
import type prettier from "prettier";
import type {SandhogConfig} from "../../config/sandhog-config.js";

export interface GenerateCocOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	contributors: Contributor[];
}
