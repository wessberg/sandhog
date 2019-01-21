import {IBackingService} from "./i-backing-service";
import {IReadmeServiceGetBackersResult} from "./i-readme-service-get-backers-result";
import {IBackingServiceGetBackersOptions} from "./i-backing-service-get-backers-options";
import {IPatreonService} from "./patreon-service/i-patreon-service";

/**
 * A service that helps with working with backers
 */
export class BackingService implements IBackingService {
	constructor(private readonly patreonService: IPatreonService) {}

	/**
	 * Gets all backers, based on the given package.json file
	 * @param {IBackingServiceGetBackersOptions} options
	 * @returns {Promise<IReadmeServiceGetBackersResult>}
	 */
	public async getBackers(options: IBackingServiceGetBackersOptions): Promise<IReadmeServiceGetBackersResult> {
		if (options.packageJson.scaffold == null || options.packageJson.scaffold.patreonUserId == null) return {};
		return await this.patreonService.getBackers(options);
	}
}
