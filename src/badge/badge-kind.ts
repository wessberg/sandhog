import {ElementOf} from "helpertypes";

export const BADGE_KINDS = [
	"downloads",
	"dependencies",
	"npm",
	"contributors",
	"license",
	"patreon",
	"open_collective_donate",
	"open_collective_backers",
	"open_collective_sponsors",
	"code_style"
] as const;
export type BadgeKind = ElementOf<typeof BADGE_KINDS>;
