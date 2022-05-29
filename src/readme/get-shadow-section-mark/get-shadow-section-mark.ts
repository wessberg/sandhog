import {SectionKind} from "../../section/section-kind.js";

/**
 * Gets a Section mark.
 *
 * @param kind
 * @param startOrEnd
 */
export function getShadowSectionMark(kind: SectionKind, startOrEnd: "start" | "end"): string {
	return `<!-- SHADOW_SECTION_${kind}_${startOrEnd} -->`.toUpperCase();
}
