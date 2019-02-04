import {SectionKind} from "../section-kind";
import {listFormat} from "../../util/list-format/list-format";
import {getValuesForEnum} from "../../util/enum/get-values-for-enum";

const SECTION_ENUM_VALUES = getValuesForEnum(SectionKind);

/**
 * Ensures that the given input is a proper SectionKind
 * @param {SectionKind|string} sectionKind
 */
export function ensureSectionKind(sectionKind: SectionKind | string): SectionKind {
	if (typeof sectionKind !== "string") return sectionKind;
	if (SECTION_ENUM_VALUES.some(key => key === sectionKind)) {
		return sectionKind as SectionKind;
	} else {
		throw new TypeError(`Could not parse string: '${sectionKind}' as a SectionKind. Possible values: ${listFormat(SECTION_ENUM_VALUES, "and")}`);
	}
}
