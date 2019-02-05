import {ElementOf} from "../util/type/element-of";
import {stringTuple} from "../util/type/string-tuple";

export const LICENSE_NAMES = stringTuple(
	"APACHE-2.0",
	"BSD-2-CLAUSE",
	"BSD-3-CLAUSE",
	"CC-BY-4.0",
	"CC-BY-SA-4.0",
	"EPL-1.0",
	"GPL-3.0",
	"GPL-2.0",
	"AGPL-3.0",
	"LGPL-3.0",
	"MIT",
	"MPL-2.0",
	"ARTISTIC-2.0",
	"ZLIB"
);

export type LicenseName = ElementOf<typeof LICENSE_NAMES>;