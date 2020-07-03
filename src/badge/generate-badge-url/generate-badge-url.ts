import {GenerateBadgeOptions} from "./generate-badge-options";
import {CONSTANT} from "../../constant/constant";

/**
 * Generates an URL for a badge based on the given options
 *
 * @param options
 * @returns
 */
export function generateBadgeUrl({color, status, subject}: GenerateBadgeOptions): string {
	return `${CONSTANT.shieldRestEndpoint}/${subject}/${status}/${color}.svg`;
}
