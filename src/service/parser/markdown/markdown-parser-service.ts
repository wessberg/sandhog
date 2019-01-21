import {IMarkdownParserService} from "./i-markdown-parser-service";
import {IMarkdownDocumentNode} from "./ast/i-markdown-node";
// @ts-ignore
import {parse} from "@textlint/markdown-to-ast";

/**
 * A service that can parse Markdown files and produce an AST from them
 */
export class MarkdownParserService implements IMarkdownParserService {
	/**
	 * Parses the given Markdown text and returns an AST from it
	 * @param {string} text
	 * @returns {IMarkdownDocumentNode}
	 */
	public parse(text: string): IMarkdownDocumentNode {
		return <IMarkdownDocumentNode>parse(text);
	}
}
