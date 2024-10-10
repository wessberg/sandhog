import type {BadgeKind} from "../badge-kind.js";

export type GetBadgesResult = {[Key in BadgeKind]?: string[]};
