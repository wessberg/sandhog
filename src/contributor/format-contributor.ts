import {Contributor} from "./contributor.js";

/**
 * Formats the relevant data of the given contributor
 *
 * @param contributor
 * @param [format]
 */
export function formatContributor({name, email, twitter, url}: Contributor, format: "html" | "markdown" | "plain" = "plain"): string {
	switch (format) {
		case "plain": {
			const nameFormatted = name == null ? [] : [name];
			const emailFormatted = email == null ? [] : [`<${email}>`];
			const twitterFormatted = twitter == null ? [] : [`(@${twitter})`];
			const urlFormatted = url == null ? [] : [`(${url})`];
			return [...nameFormatted, ...emailFormatted, ...twitterFormatted, ...urlFormatted].join(" ");
		}

		case "html": {
			const nameFormatted: string[] = (() => {
				if (name == null) return [];
				else if (email != null) {
					return [`<a href="mailto:${email}">${name}</a>`];
				} else {
					return [name];
				}
			})();

			const twitterFormatted = twitter == null ? [] : [`(<a href="https://twitter.com/${twitter}">@${twitter}</a>)`];
			const urlFormatted = url == null ? [] : [`(<a href="${url}">Website</a>)`];
			return [...nameFormatted, ...twitterFormatted, ...urlFormatted].join(" ");
		}

		case "markdown": {
			const nameFormatted: string[] = (() => {
				if (name == null) return [];
				else if (email != null) {
					return [`[${name}](mailto:${email})`];
				} else {
					return [name];
				}
			})();

			const twitterFormatted = twitter == null ? [] : [`([@${twitter}](https://twitter.com/${twitter}))`];
			const urlFormatted = url == null ? [] : [`([Website](${url}))`];
			return [...nameFormatted, ...twitterFormatted, ...urlFormatted].join(" ");
		}
	}
}
