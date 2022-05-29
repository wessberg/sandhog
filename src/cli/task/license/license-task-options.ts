import {TaskOptions} from "../task-options.js";
import {LicenseName} from "../../../license/license-name.js";

export interface LicenseTaskOptions extends TaskOptions {
	license: LicenseName;
}
