import {GenerateReadmeOptions} from "./generate-readme-options.js";
import {SectionKind} from "../../section/section-kind.js";

export interface GenerateReadmeContext extends GenerateReadmeOptions {
	sections: Set<SectionKind>;
	str: string;
}
