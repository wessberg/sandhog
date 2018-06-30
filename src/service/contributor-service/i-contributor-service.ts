import {IContributor, IPackageJson} from "../../package-json/i-package-json";

export interface IContributorService {
	getContributors (packageJson: IPackageJson): IContributor[];
	getContributingText (packageJson: IPackageJson, contributors: IContributor[]): string;
	formatContributorNames (contributors: IContributor[], markdownFormat?: boolean): string;

}