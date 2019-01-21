import {IReadmeTask} from "./i-readme-task";
import {IReadmeTaskExecuteOptions} from "./i-readme-task-execute-options";
import {IReadmeService} from "../../service/readme/i-readme-service";
import {IProjectService} from "../../service/project/i-project-service";
import {IFileSaver} from "@wessberg/filesaver";
import {ReadmeCommandLongOptionKind} from "../../command/readme-command/i-readme-command";

/**
 * A task used for working with READMEs
 */
export class ReadmeTask implements IReadmeTask {
	constructor(private readonly readmeService: IReadmeService, private readonly fileSaver: IFileSaver, private readonly projectService: IProjectService) {}

	/**
	 * Executes a 'readme' task
	 * @param {IReadmeTaskExecuteOptions} options
	 * @returns {Promise<void>}
	 */
	public async execute(options: IReadmeTaskExecuteOptions): Promise<void> {
		// Take all the headers that should be blacklisted
		const blacklistOptions = options[ReadmeCommandLongOptionKind.BLACKLIST];
		const blacklist =
			blacklistOptions == null || blacklistOptions === true
				? []
				: blacklistOptions
						.split(",")
						.map(part => part.trim())
						.filter(part => part.length > 0);

		const {packageJson} = await this.projectService.getPackageJson();
		const {path, readme} = await this.projectService.getReadme();
		let content: string;

		if (options.reset || readme == null) {
			const resetResult = await this.readmeService.reset({packageJson, blacklist});
			content = resetResult.content;
		} else {
			const upgradeResult = await this.readmeService.upgrade({packageJson, readme, blacklist});
			content = upgradeResult.content;
		}

		// Write the changed README to disk
		await this.fileSaver.save(path, content);
	}
}
