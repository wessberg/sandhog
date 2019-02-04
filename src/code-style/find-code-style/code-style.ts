import {CodeStyleKind} from "../code-style-kind";

export interface CodeStyle {
	kind: CodeStyleKind;
	badgeUrl: string;
	url: string;
}
