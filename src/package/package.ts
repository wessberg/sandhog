// tslint:disable:no-any
import {ScaffoldConfig} from "../config/scaffold-config";
import {DeepPartial} from "../util/type/deep-partial";

interface Author {
	name: string;
	email: string;
	url: string;
}

export interface Package {
	name?: string;
	description?: string;
	repository?: {
		url?: string;
	};
	license?: string;
	scaffold?: DeepPartial<ScaffoldConfig>;
	author?: Partial<Author> | string;
	authors?: (Partial<Author> | string)[];
	contributors?: (Partial<Author> | string)[];
	xo?: Record<string, string>;
	devDependencies?: Record<string, string>;
	dependencies?: Record<string, string>;
}
