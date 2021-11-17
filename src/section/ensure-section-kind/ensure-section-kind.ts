import {SectionKind, SECTION_KINDS} from "../section-kind";
import {listFormat} from "../../util/list-format/list-format";

/**
 * Ensures that the given input is a proper SectionKind
 */
export function ensureSectionKind(sectionKind: SectionKind | string): SectionKind {
	if (typeof sectionKind !== "string") return sectionKind;
	if (SECTION_KINDS.some(key => key === sectionKind)) {
		return sectionKind as SectionKind;
	} else {
		throw new TypeError(`Could not parse string: '${sectionKind}' as a SectionKind. Possible values: ${listFormat(SECTION_KINDS, "and")}`);
	}
}
