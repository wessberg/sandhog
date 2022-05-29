import baseConfig from "@wessberg/ts-config/sandhog.config.js";
export default {
	...baseConfig,
	isDevelopmentPackage: true,
	logo: {
		height: 200,
		url: "https://raw.githubusercontent.com/wessberg/sandhog/master/documentation/asset/logo.png"
	},
	featureImage: {
		height: 300,
		url: "https://raw.githubusercontent.com/wessberg/sandhog/master/documentation/asset/feature.svg"
	}
};