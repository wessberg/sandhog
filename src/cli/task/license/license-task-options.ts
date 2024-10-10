import type {TaskOptions} from "../task-options.js";
import type {LicenseName} from "../../../license/license-name.js";

export interface LicenseTaskOptions extends TaskOptions {
	license: LicenseName;
}
