import {Contributor} from "../../contributor/contributor.js";
import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config.js";

export interface GenerateCocOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	contributors: Contributor[];
}
