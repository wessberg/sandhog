import ts from "@wessberg/rollup-plugin-ts";
import packageJSON from "./package.json";
import {dirname} from "path";
import {builtinModules} from "module";

export default {
	input: {
		api: "src/index.ts",
		cli: "src/cli/index.ts"
	},
	output: [
		{
			dir: dirname(packageJSON.main),
			format: "cjs",
			sourcemap: true
		}
	],
	treeshake: true,
	plugins: [
		ts({
			tsconfig: process.env.NODE_ENV === "production" ? "tsconfig.dist.json" : "tsconfig.json"
		})
	],
	external: [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.devDependencies), ...builtinModules]
};
