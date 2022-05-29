import {CodeStyleKind} from "../code-style-kind.js";

export interface CodeStyle {
	kind: CodeStyleKind;
	badgeUrl: string;
	url: string;
}
