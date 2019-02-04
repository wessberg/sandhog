import {FormatUrlOptions} from "./format-url-options";

/**
 * Generates an Markdown-formatted URL based on the given options
 * @param {FormatUrlOptions} options
 * @returns {string}
 */
export function formatUrl({inner, url}: FormatUrlOptions): string {
	return `<a href="${url}">${inner}</a>`;
}
