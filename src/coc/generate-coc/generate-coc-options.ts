import {Contributor} from "../../contributor/contributor";
import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config";

export interface GenerateCocOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	contributors: Contributor[];
}
