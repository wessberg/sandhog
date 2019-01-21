import {IProjectServiceGetPackageJsonResult} from "./i-project-service-get-package-json-result";
import {IProjectServiceGetReadmeResult} from "./i-project-service-get-readme-result";

export interface IProjectService {
	findRoot(): Promise<string>;
	getPackageJson(): Promise<IProjectServiceGetPackageJsonResult>;
	getReadme(): Promise<IProjectServiceGetReadmeResult>;
}
