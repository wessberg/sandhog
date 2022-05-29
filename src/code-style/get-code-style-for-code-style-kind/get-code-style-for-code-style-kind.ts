import {CodeStyleKind} from "../code-style-kind.js";
import {CodeStyle} from "../find-code-style/code-style.js";
import {generateBadgeUrl} from "../../badge/generate-badge-url/generate-badge-url.js";

/**
 * Gets the Code Style for the given CodeStyleKind
 *
 * @param kind
 * @returns
 */
export function getCodeStyleForCodeStyleKind(kind: CodeStyleKind): CodeStyle {
	switch (kind) {
		case CodeStyleKind.PRETTIER:
			return {
				kind,
				badgeUrl: "https://img.shields.io/badge/code_style-prettier-ff69b4.svg",
				url: "https://github.com/prettier/prettier"
			};

		case CodeStyleKind.STANDARD:
			return {
				kind,
				badgeUrl: "https://img.shields.io/badge/code%20style-standard-green.svg",
				url: "https://github.com/feross/standard"
			};

		case CodeStyleKind.AIRBNB:
			return {
				kind,
				badgeUrl: "https://badgen.net/badge/code%20style/airbnb/ff5a5f",
				url: "https://github.com/airbnb/javascript"
			};

		case CodeStyleKind.IDIOMATIC:
			return {
				kind,
				badgeUrl: generateBadgeUrl({subject: "code style", status: kind, color: "green"}),
				url: "https://github.com/rwaldron/idiomatic.js"
			};
		case CodeStyleKind.GOOGLE:
			return {
				kind,
				badgeUrl: generateBadgeUrl({subject: "code style", status: kind, color: "green"}),
				url: "https://google.github.io/styleguide/jsguide.html"
			};
		case CodeStyleKind.XO:
			return {
				kind,
				badgeUrl: "https://img.shields.io/badge/code_style-XO-5ed9c7.svg",
				url: "https://github.com/xojs/xo"
			};
	}
}
