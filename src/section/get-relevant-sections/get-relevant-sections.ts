import {GetRelevantSectionsOptions} from "./get-relevant-sections-options";
import {SectionKind} from "../section-kind";
import {getValuesForEnum} from "../../util/enum/get-values-for-enum";

/**
 * Gets all those sections that are relevant in relation to the given options
 *
 * @param options
 * @returns
 */
export function getRelevantSections({config}: GetRelevantSectionsOptions): Set<SectionKind> {
	const excluded: Set<SectionKind> = new Set(config.readme.sections.exclude != null ? config.readme.sections.exclude : []);

	// Prepare the baseline of sections. This will be the sections that will be included always (except for the excluded ones).
	return new Set(getValuesForEnum(SectionKind).filter(value => !excluded.has(value)));
}
