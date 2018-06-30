import {environment} from "../environment/environment";
import {IConfig} from "./i-config";

export const config: IConfig = {
	...environment,
	defaultLicense: "MIT",
	readme: {
		logoHeight: 200,
		badgeHeight: 20,
		teamMemberHeight: 11,
		backerHeight: 50
	},
	formatOptions: {
		useTabs: true,
		semi: true,
		tabWidth: 2,
		singleQuote: false,
		trailingComma: "none",
		bracketSpacing: false,
		printWidth: 90,
		arrowParens: "avoid"
	}
};