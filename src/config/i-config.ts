// tslint:disable:no-any

import {Options} from "prettier";
import {environment} from "../environment/environment";
import {LicenseName} from "../service/license/license-name";

export declare type IConfig = typeof environment & {
	defaultLicense: LicenseName;
	readme: {
		logoHeight: number;
		badgeHeight: number;
		teamMemberHeight: number;
		backerHeight: number;
	};
	formatOptions: Options;
};