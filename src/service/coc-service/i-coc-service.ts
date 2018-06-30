import {IContributor} from "../../package-json/i-package-json";

export interface ICocService {
	getCocText (cocEnforcers: IContributor[]): string;

}