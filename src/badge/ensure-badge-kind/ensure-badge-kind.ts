import {listFormat} from "../../util/list-format/list-format";
import {getValuesForEnum} from "../../util/enum/get-values-for-enum";
import {BadgeKind} from "../badge-kind";

const BADGE_ENUM_VALUES = getValuesForEnum(BadgeKind);

/**
 * Ensures that the given input is a proper BadgeKind
 * @param {BadgeKind|string} badgeKind
 */
export function ensureBadgeKind(badgeKind: BadgeKind | string): BadgeKind {
	if (typeof badgeKind !== "string") return badgeKind;
	if (BADGE_ENUM_VALUES.some(key => key === badgeKind)) {
		return badgeKind as BadgeKind;
	} else {
		throw new TypeError(`Could not parse string: '${badgeKind}' as a BadgeKind. Possible values: ${listFormat(BADGE_ENUM_VALUES, "and")}`);
	}
}
