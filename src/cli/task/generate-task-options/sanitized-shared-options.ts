import {SHARED_OPTIONS} from "../../command/shared/shared-options";

export type SanitizedSharedOptions = {
	[Key in keyof typeof SHARED_OPTIONS]: typeof SHARED_OPTIONS[Key]["type"] extends "boolean"
		? boolean
		: typeof SHARED_OPTIONS[Key]["type"] extends "number"
		? number
		: string;
};
