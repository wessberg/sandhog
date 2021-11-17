import {GetRelevantSectionsOptions} from "./get-relevant-sections-options";
import {SectionKind, SECTION_KINDS} from "../section-kind";

/**
 * Gets all those sections that are relevant in relation to the given options
 */
export function getRelevantSections({config}: GetRelevantSectionsOptions): Set<SectionKind> {
	const excluded: Set<SectionKind> = new Set(config.readme.sections.exclude != null ? config.readme.sections.exclude : []);

	// Prepare the baseline of sections. This will be the sections that will be included always (except for the excluded ones).
	return new Set(SECTION_KINDS.filter(value => !excluded.has(value)));
}
