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
	bin?: Record<string, string>;
	repository?: {
		url?: string;
	};
	funding?: string | Partial<{type: string; url: string}>;
	license?: string;
	scaffold?: DeepPartial<ScaffoldConfig>;
	author?: Partial<Author> | string;
	authors?: (Partial<Author> | string)[];
	contributors?: (Partial<Author> | string)[];
	xo?: Record<string, string>;
	devDependencies?: Record<string, string>;
	dependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
}
