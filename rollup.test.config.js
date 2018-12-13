import ts from "@wessberg/rollup-plugin-ts";
import {di} from "@wessberg/di-compiler";
import packageJSON from "./package.json";

export default {
	input: "test/readme-service/readme-service.test.ts",
	output: {
		file: "compiled/readme-service.test.js",
		format: "cjs",
		sourcemap: true
	},
	treeshake: true,
	plugins: [
		ts({
			tsconfig: "tsconfig.json",
			transformers: [
				di
			]
		})
	],
	external: [
		...Object.keys(packageJSON.dependencies),
		...Object.keys(packageJSON.devDependencies),
		"path"
	]
};