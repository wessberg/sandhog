import {IBacker} from "../../package-json/i-package-json";

export interface IReadmeServiceGetBackersResult {
	[kind: string]: IBacker[];
}