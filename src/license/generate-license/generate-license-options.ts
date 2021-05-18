import prettier from "prettier";
import {SandhogConfig} from "../../config/sandhog-config";
import {Contributor} from "../../contributor/contributor";
import {Package} from "../../package/package";

export interface GenerateLicenseOptions {
	prettier: typeof prettier;
	config: SandhogConfig;
	pkg: Package;
	contributors: Contributor[];
}
