import type {FormatUrlOptions} from "./format-url-options.js";

/**
 * Generates an Markdown-formatted URL based on the given options
 */
export function formatUrl({inner, url}: FormatUrlOptions): string {
	return `<a href="${url}">${inner}</a>`;
}
