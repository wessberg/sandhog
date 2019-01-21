import {LicenseName} from "../service/license/license-name";

export interface IBacker {
	name: string;
	url?: string;
	imageUrl?: string;
}

export interface IContributorMeta {
	imageUrl: string;
	role: string;
	twitterHandle: string;
	isCocEnforcer: boolean;
}

export interface IScaffoldConfig {
	backers: {[kind: string]: IBacker[]};
	patreonUserId: string;
	logo: string;
	contributorMeta: {[contributorName: string]: Partial<IContributorMeta>};
}

export interface IRepository {
	type: string;
	url: string;
}

export interface IBugs {
	url: string;
}

export interface IContributor extends Partial<IContributorMeta> {
	name: string;
	email: string;
	url: string;
}

export declare type PackageJsonMainField = "module" | "browser" | "es2015" | "main" | "jsnext:main";

export interface IPackageJson {
	name?: string;
	version?: string;
	description?: string;
	scripts?: {[key: string]: string};
	keywords?: string[];
	devDependencies?: {[key: string]: string};
	peerDependencies?: {[key: string]: string};
	dependencies?: {[key: string]: string};
	module?: string;
	main?: string;
	"jsnext:main"?: string;
	browser?: string;
	types?: string;
	typings?: string;
	es2015?: string;
	repository?: IRepository;
	bugs?: IBugs;
	author?: IContributor;
	authors?: IContributor[];
	contributors?: IContributor[];
	engines?: {[key: string]: string};
	license?: LicenseName;
	private?: boolean;
	scaffold?: Partial<IScaffoldConfig>;
}
