import {Options} from "prettier";

export interface IFormatter {
	format (source: string, options?: Options): string;
}