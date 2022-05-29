import fs from "fs";

export interface FileSystem {
	writeFileSync: typeof fs.writeFileSync;
	readFileSync: typeof fs.readFileSync;
	existsSync: typeof fs.existsSync;
	mkdirSync: typeof fs.mkdirSync;
}
