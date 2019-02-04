import {TaskOptions} from "../task-options";
import {LicenseName} from "../../../license/license-name";

export interface LicenseTaskOptions extends TaskOptions {
	license: LicenseName;
}
