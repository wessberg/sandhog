import typescriptRollupPlugin from "@wessberg/rollup-plugin-ts";
import diPlugin from "@wessberg/rollup-plugin-di";
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
		diPlugin(),
		typescriptRollupPlugin({
			tsconfig: "tsconfig.json",
			include: ["*.ts+(|x)", "**/*.ts+(|x)"],
			exclude: ["*.d.ts", "**/*.d.ts"]
		})
	],
	external: [
		...Object.keys(packageJSON.dependencies),
		...Object.keys(packageJSON.devDependencies),
		"path"
	]
};