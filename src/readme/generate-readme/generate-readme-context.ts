import {GenerateReadmeOptions} from "./generate-readme-options";
import {SectionKind} from "../../section/section-kind";

export interface GenerateReadmeContext extends GenerateReadmeOptions {
	sections: Set<SectionKind>;
	str: string;
}
