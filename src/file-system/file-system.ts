import {existsSync, readFileSync, writeFileSync} from "fs";

export interface FileSystem {
	writeFileSync: typeof writeFileSync;
	readFileSync: typeof readFileSync;
	existsSync: typeof existsSync;
}
