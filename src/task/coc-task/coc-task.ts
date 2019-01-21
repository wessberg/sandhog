import {ICocTask} from "./i-coc-task";
import {ICocTaskExecuteOptions} from "./i-coc-task-execute-options";
import {IProjectService} from "../../service/project/i-project-service";
import {IFileSaver} from "@wessberg/filesaver";
import {IContributorService} from "../../service/contributor-service/i-contributor-service";
import {join} from "path";
import {ICocService} from "../../service/coc-service/i-coc-service";

/**
 * A task used for generating a CODE_OF_CONDUCT.md file
 */
export class CocTask implements ICocTask {
	constructor(
		private readonly contributorService: IContributorService,
		private readonly cocService: ICocService,
		private readonly fileSaver: IFileSaver,
		private readonly projectService: IProjectService
	) {}

	/**
	 * Executes a 'coc' task
	 * @param {ICocTaskExecuteOptions} _options
	 * @returns {Promise<void>}
	 */
	public async execute(_options: ICocTaskExecuteOptions): Promise<void> {
		const rootDirectory = await this.projectService.findRoot();
		const cocPath = join(rootDirectory, "CODE_OF_CONDUCT.md");
		const {packageJson} = await this.projectService.getPackageJson();

		// Generate the CODE_OF_CONDUCT.md text
		const cocText = this.cocService.getCocText(this.contributorService.getContributors(packageJson).filter(contributor => contributor.isCocEnforcer));
		await this.fileSaver.save(cocPath, cocText);
	}
}
