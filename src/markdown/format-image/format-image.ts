import {FormatImageOptions} from "./format-image-options.js";

/**
 * Generates a Markdown-formatted image based on the given options
 *
 * @param options
 * @returns
 */
export function formatImage({alt, url, height, width, kind = "html"}: FormatImageOptions): string {
	if (kind === "html") {
		return `<img ${alt != null ? `alt="${alt}"` : ""} src="${url}" ${height == null ? "" : `height="${height}"`} ${width == null ? "" : `width="${width}"`}  />`;
	} else {
		return `![${alt != null ? alt : ""}](${url})`;
	}
}
