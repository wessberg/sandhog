import {ILicenseTask} from "./i-license-task";
import {ILicenseTaskExecuteOptions} from "./i-license-task-execute-options";
import {IProjectService} from "../../service/project/i-project-service";
import {IFileSaver} from "@wessberg/filesaver";
import {ILicenseService} from "../../service/license/i-license-service";
import {IContributorService} from "../../service/contributor-service/i-contributor-service";
import {join} from "path";

/**
 * A task used for generating a license
 */
export class LicenseTask implements ILicenseTask {

	constructor (private readonly licenseService: ILicenseService,
							 private readonly contributorService: IContributorService,
							 private readonly fileSaver: IFileSaver,
							 private readonly projectService: IProjectService) {
	}

	/**
	 * Executes a 'license' task
	 * @param {ILicenseTaskExecuteOptions} _options
	 * @returns {Promise<void>}
	 */
	public async execute (_options: ILicenseTaskExecuteOptions): Promise<void> {
		const rootDirectory = await this.projectService.findRoot();
		const licensePath = join(rootDirectory, "LICENSE.md");
		const {packageJson} = await this.projectService.getPackageJson();
		if (packageJson.license == null) return;

		// Generate the license text
		const licenseText = this.licenseService.generateLicenseText(packageJson.license, packageJson, this.contributorService.getContributors(packageJson));
		await this.fileSaver.save(licensePath, licenseText);
	}
}