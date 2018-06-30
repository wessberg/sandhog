import {IContributingTask} from "./i-contributing-task";
import {IContributingTaskExecuteOptions} from "./i-contributing-task-execute-options";
import {IProjectService} from "../../service/project/i-project-service";
import {IFileSaver} from "@wessberg/filesaver";
import {IContributorService} from "../../service/contributor-service/i-contributor-service";
import {join} from "path";

/**
 * A task used for generating a CONTRIBUTING.md file
 */
export class ContributingTask implements IContributingTask {

	constructor (private readonly contributorService: IContributorService,
							 private readonly fileSaver: IFileSaver,
							 private readonly projectService: IProjectService) {
	}

	/**
	 * Executes a 'contributing' task
	 * @param {IContributingTaskExecuteOptions} _options
	 * @returns {Promise<void>}
	 */
	public async execute (_options: IContributingTaskExecuteOptions): Promise<void> {
		const rootDirectory = await this.projectService.findRoot();
		const contributingPath = join(rootDirectory, "CONTRIBUTING.md");
		const {packageJson} = await this.projectService.getPackageJson();

		// Generate the CONTRIBUTING.md text
		const contributingText = this.contributorService.getContributingText(
			packageJson,
			await this.contributorService.getContributors(packageJson)
		);
		await this.fileSaver.save(contributingPath, contributingText);
	}
}