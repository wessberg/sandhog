import {listFormat} from "../../util/list-format/list-format.js";
import {BadgeKind, BADGE_KINDS} from "../badge-kind.js";

/**
 * Ensures that the given input is a proper BadgeKind
 */
export function ensureBadgeKind(badgeKind: BadgeKind | string): BadgeKind {
	if (typeof badgeKind !== "string") return badgeKind;
	if (BADGE_KINDS.some(key => key === badgeKind)) {
		return badgeKind as BadgeKind;
	} else {
		throw new TypeError(`Could not parse string: '${badgeKind}' as a BadgeKind. Possible values: ${listFormat(BADGE_KINDS, "and")}`);
	}
}
