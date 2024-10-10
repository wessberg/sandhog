import type {GetRelevantSectionsOptions} from "./get-relevant-sections-options.js";
import type {SectionKind} from "../section-kind.js";
import {SECTION_KINDS} from "../section-kind.js";

/**
 * Gets all those sections that are relevant in relation to the given options
 */
export function getRelevantSections({config}: GetRelevantSectionsOptions): Set<SectionKind> {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const excluded = new Set<SectionKind>(config.readme.sections.exclude ?? []);

	// Prepare the baseline of sections. This will be the sections that will be included always (except for the excluded ones).
	return new Set(SECTION_KINDS.filter(value => !excluded.has(value)));
}
