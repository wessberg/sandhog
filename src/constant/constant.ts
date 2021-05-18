export const CONSTANT = {
	configFilenameJs: "sandhog.config.js",
	configFilenameJson: "sandhog.config.json",
	configFilenameJson5: "sandhog.config.json5",
	configFilenameYaml: "sandhog.config.yaml",
	configFilenameYml: "sandhog.config.yml",
	configFilenameRc: ".sandhogrc",
	readmeFilename: "README.md",
	contributorImageUrlHeight: 70,
	githubDirName: ".github",
	codeOfConductFilename: "CODE_OF_CONDUCT.md",
	fundingFilename: "FUNDING.yml",
	contributingFilename: "CONTRIBUTING.md",
	licenseFilename: "LICENSE.md",
	eslintIdiomaticCodeStyleName: "idiomatic",
	eslintGoogleCodeStyleName: "google",
	eslintPrettierCodeStyleName: "eslint-config-prettier",
	eslintAirbnbCodeStyleName: "airbnb",
	eslintAirbnbCodeStyleHint: "eslint-config-airbnb",
	eslintXoCodeStyleName: "xo",
	eslintStandardCodeStyleName: "standard",
	eslintStandardCodeStyleHints: [
		"standard/object-curly-even-spacing",
		"standard/array-bracket-even-spacing",
		"standard/computed-property-even-spacing",
		"standard/no-callback-literal"
	],
	shieldRestEndpoint: "https://img.shields.io/badge",
	patreonDonateUrl: (userId: string) => `https://www.patreon.com/bePatron?u=${userId}`,
	patreonBadgeUrl: (username: string) => `https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3D${username}%26type%3Dpatrons`,
	openCollectiveDonateUrl: (projectName: string) => `https://opencollective.com/${projectName}/contribute/`,
	openCollectiveContributorsUrl: (projectName: string) => `https://opencollective.com/${projectName}/#contributors`,
	openCollectiveSponsorsBadgeUrl: (project: string) => `https://opencollective.com/${project}/sponsors.svg?width=500`,
	openCollectiveBackersBadgeUrl: (project: string) => `https://opencollective.com/${project}/backers.svg?width=500`
};
