import {GenerateLicenseOptions} from "../generate-license-options";
import {listFormat} from "../../../util/list-format/list-format";
import {formatContributor} from "../../../contributor/format-contributor";

/**
 * Generates a MIT license
 * @param {GenerateLicenseOptions} options
 */
export function generate({contributors, prettier, config}: GenerateLicenseOptions): string {
	return prettier.format(
		`\
The MIT License (MIT)

Copyright © ${new Date().getFullYear()} ${listFormat(contributors.map(contributor => formatContributor(contributor, "markdown")), "and")}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE`,
		{
			...config.prettier,
			parser: "markdown"
		}
	);
}
