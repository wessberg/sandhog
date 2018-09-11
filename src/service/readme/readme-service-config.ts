import {IReadmeServiceConfig} from "./i-readme-service-config";

export const readmeServiceConfig: IReadmeServiceConfig = {
	introHeader: {
		name: packageJson => `\`${packageJson.name}\``,
		identifier: "intro",
		depth: 1
	},

	descriptionHeader: {
		name: () => "Description",
		identifier: "description",
		depth: 2
	},

	installHeader: {
		name: () => "Install",
		identifier: "install",
		depth: 2
	},

	usageHeader: {
		name: () => "Usage",
		identifier: "usage",
		depth: 2
	},

	contributingHeader: {
		name: () => "Contributing",
		identifier: "contributing",
		depth: 2
	},

	maintainersHeader: {
		name: () => "Maintainers",
		identifier: "maintainers",
		depth: 2
	},

	faqHeader: {
		name: () => "FAQ",
		identifier: "faq",
		depth: 2
	},

	backersHeader: {
		name: () => "Backers 🏅",
		identifier: "backers",
		depth: 2
	},

	licenseHeader: {
		name: () => "License 📄",
		identifier: "license",
		depth: 2
	}
};