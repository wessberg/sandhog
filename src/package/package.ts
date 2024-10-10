import type {SandhogConfig} from "../config/sandhog-config.js";
import type {PartialDeep} from "helpertypes";

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
	sandhog?: PartialDeep<SandhogConfig>;
	author?: Partial<Author> | string;
	authors?: (Partial<Author> | string)[];
	contributors?: (Partial<Author> | string)[];
	xo?: Record<string, string>;
	devDependencies?: Record<string, string>;
	dependencies?: Record<string, string>;
	peerDependencies?: Record<string, string>;
	peerDependenciesMeta?: Record<string, Partial<{optional: boolean}>>;
}
