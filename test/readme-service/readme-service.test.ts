import {container} from "../../src/services";

import test from "ava";
import {IReadmeService} from "../../src/service/readme/i-readme-service";
import {IProjectService} from "../../src/service/project/i-project-service";
import {IFileLoader} from "@wessberg/fileloader";
import {IFileSaver} from "@wessberg/filesaver";
import {join} from "path";

const readmeService = container.get<IReadmeService>();
const projectService = container.get<IProjectService>();
const fileLoader = container.get<IFileLoader>();
const fileSaver = container.get<IFileSaver>();

test.serial("Correctly resets a README", async t => {
	const root = await projectService.findRoot();
	const readmePath = join(root, "test/asset/readme_1.md");

	const {content} = await readmeService.reset({
		packageJson: (await projectService.getPackageJson()).packageJson,
		blacklist: []
	});
	// Assert that a README was generated
	const success = content != null;

	if (success) {
		// Write the updated README to disk
		await fileSaver.save(readmePath, content);
	}
	t.true(success);
});

test.serial("Won't upgrade an existing README if all sections are there already", async t => {
	const root = await projectService.findRoot();
	const readmePath = join(root, "test/asset/readme_1.md");
	const readme = (await fileLoader.exists(readmePath)) ? (await fileLoader.load(readmePath)).toString() : null;

	// There is no README, so pass the test!
	if (readme == null) return t.pass();

	const {content} = await readmeService.upgrade({
		packageJson: (await projectService.getPackageJson()).packageJson,
		blacklist: [],
		readme
	});
	// Assert that the README is identical to the one from disk
	const success = content === readme;
	t.true(success);
});