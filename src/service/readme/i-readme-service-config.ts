import {IPackageJson} from "../../package-json/i-package-json";

export interface IReadmeServiceHeaderConfig {
	name(packageJson: IPackageJson): string;
	identifier: string;
	depth: number;
}

export interface IReadmeServiceConfig {
	introHeader: IReadmeServiceHeaderConfig;
	descriptionHeader: IReadmeServiceHeaderConfig;
	installHeader: IReadmeServiceHeaderConfig;
	usageHeader: IReadmeServiceHeaderConfig;
	contributingHeader: IReadmeServiceHeaderConfig;
	maintainersHeader: IReadmeServiceHeaderConfig;
	faqHeader: IReadmeServiceHeaderConfig;
	backersHeader: IReadmeServiceHeaderConfig;
	licenseHeader: IReadmeServiceHeaderConfig;
}
