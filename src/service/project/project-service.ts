import {IProjectService} from "./i-project-service";
import {join} from "path";
import {IFileLoader} from "@wessberg/fileloader";
import {IProjectServiceGetPackageJsonResult} from "./i-project-service-get-package-json-result";
import {IProjectServiceGetReadmeResult} from "./i-project-service-get-readme-result";

/**
 * A Service that helps with getting resources within a project
 */
export class ProjectService implements IProjectService {
	constructor(private readonly fileLoader: IFileLoader) {}

	/**
	 * Finds the project root directory. The project root will be the nearest directory that contains a package.json file
	 * @returns {string}
	 */
	public async findRoot(): Promise<string> {
		let currentDir = process.cwd();

		while (currentDir != null && currentDir !== "" && currentDir !== "/") {
			if (this.fileLoader.existsSync(join(currentDir, "package.json"))) {
				return currentDir;
			}
			currentDir = join(currentDir, "../");
		}

		throw new ReferenceError(`Could not find a project root from location: ${process.cwd()}`);
	}

	/**
	 * Gets the package.json file that resides in the nearest project root
	 * @returns {Promise<IProjectServiceGetPackageJsonResult>}
	 */
	public async getPackageJson(): Promise<IProjectServiceGetPackageJsonResult> {
		const root = await this.findRoot();
		const path = join(root, "package.json");
		const packageJson = await this.fileLoader.load(path);
		return {
			path,
			packageJson: JSON.parse(packageJson.toString())
		};
	}

	/**
	 * Gets the README.md file that resides in the nearest project root, if any exists
	 * @returns {Promise<IProjectServiceGetReadmeResult>}
	 */
	public async getReadme(): Promise<IProjectServiceGetReadmeResult> {
		const root = await this.findRoot();
		const path = join(root, "README.md");
		// If the README doesn't exist, return undefined
		if (!(await this.fileLoader.exists(path))) return {path};

		// Otherwise, load it and return it
		const readme = await this.fileLoader.load(path);
		return {
			path,
			readme: readme.toString()
		};
	}
}
