import {IPatreonService} from "./i-patreon-service";
import {IBackingServiceGetBackersOptions} from "../i-backing-service-get-backers-options";
import {IReadmeServiceGetBackersResult} from "../i-readme-service-get-backers-result";

/**
 * A service that enables working with Patreon
 */
export class PatreonService implements IPatreonService {
	/**
	 * Gets all Patreon backers
	 * @param {IBackingServiceGetBackersOptions} options
	 * @returns {Promise<IReadmeServiceGetBackersResult>}
	 */
	public async getBackers ({packageJson}: IBackingServiceGetBackersOptions): Promise<IReadmeServiceGetBackersResult> {
		if (packageJson.scaffold == null || packageJson.scaffold.patreonUserId == null || packageJson.scaffold.backers == null) return {};
		return packageJson.scaffold.backers;
	}

}