import {ElementOf} from "helpertypes";

export const SECTION_KINDS = [
	"toc",
	"logo",
	"badges",
	"description_short",
	"description_long",
	"features",
	"feature_image",
	"usage",
	"install",
	"contributing",
	"maintainers",
	"faq",
	"backers",
	"license"
] as const;

export type SectionKind = ElementOf<typeof SECTION_KINDS>;
