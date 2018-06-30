import {IReadmeServiceConfig} from "./i-readme-service-config";

export const readmeServiceConfig: IReadmeServiceConfig = {
	introHeader: {
		name: packageJson => `\`${packageJson.name}\``,
		depth: 1
	},

	descriptionHeader: {
		name: () => "Description",
		depth: 2
	},

	installHeader: {
		name: () => "Install",
		depth: 2
	},

	usageHeader: {
		name: () => "Usage",
		depth: 2
	},

	contributingHeader: {
		name: () => "Contributing",
		depth: 2
	},

	maintainersHeader: {
		name: () => "Maintainers",
		depth: 2
	},

	faqHeader: {
		name: () => "FAQ",
		depth: 2
	},

	backersHeader: {
		name: () => "Backers 🏅",
		depth: 2
	},

	licenseHeader: {
		name: () => "License 📄",
		depth: 2
	}
};