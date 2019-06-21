import {FormatImageOptions} from "./format-image-options";

/**
 * Generates a Markdown-formatted image based on the given options
 * @param {FormatImageOptions} options
 * @returns {string}
 */
export function formatImage({alt, url, height, width, kind = "html"}: FormatImageOptions): string {
	if (kind === "html") {
		return `<img ${alt != null ? `alt="${alt}"` : ""} src="${url}" ${height == null ? "" : `height="${height}"`} ${
			width == null ? "" : `width="${width}"`
		}  />`;
	} else {
		return `![${alt != null ? alt : ""}](${url})`;
	}
}
