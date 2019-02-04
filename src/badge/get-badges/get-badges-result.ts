import {BadgeKind} from "../badge-kind";

export type GetBadgesResult = {[Key in BadgeKind]?: string[]};
