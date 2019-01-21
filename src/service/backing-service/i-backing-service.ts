import {IReadmeServiceGetBackersResult} from "./i-readme-service-get-backers-result";
import {IBackingServiceGetBackersOptions} from "./i-backing-service-get-backers-options";

export interface IBackingService {
	getBackers(options: IBackingServiceGetBackersOptions): Promise<IReadmeServiceGetBackersResult>;
}
