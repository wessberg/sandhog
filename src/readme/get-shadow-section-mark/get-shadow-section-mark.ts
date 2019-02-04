import {SectionKind} from "../../section/section-kind";

/**
 * Gets a Section mark.
 * @param {SectionKind} kind
 * @param {"start"|"end"} startOrEnd
 */
export function getShadowSectionMark(kind: SectionKind, startOrEnd: "start" | "end"): string {
	return `<!-- SHADOW_SECTION_${kind}_${startOrEnd} -->`.toUpperCase();
}
