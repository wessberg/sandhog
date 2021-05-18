import {Contributor} from "../../contributor/contributor";
import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config";
import {Package} from "../../package/package";

export interface GenerateContributingOptions {
	prettier: typeof prettier;
	pkg: Package;
	config: SandhogConfig;
	contributors: Contributor[];
}
