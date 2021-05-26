import ts from "@wessberg/rollup-plugin-ts";
import pkg from "./package.json";
import {dirname} from "path";
import {builtinModules} from "module";

const SHARED_OPTIONS = {
	plugins: [
		ts({
			tsconfig: "tsconfig.build.json"
		})
	],
	external: [...builtinModules, ...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {}), ...Object.keys(pkg.peerDependencies ?? {})]
};

export default [
	{
		input: "src/index.ts",
		preserveEntrySignatures: true,
		output: [
			{
				dir: dirname(pkg.main),
				format: "cjs",
				sourcemap: true
			}
		],
		...SHARED_OPTIONS
	},
	{
		input: "src/cli/index.ts",
		preserveEntrySignatures: true,
		output: [
			{
				dir: "./dist/cli",
				format: "cjs",
				sourcemap: true
			}
		],
		...SHARED_OPTIONS
	}
];
