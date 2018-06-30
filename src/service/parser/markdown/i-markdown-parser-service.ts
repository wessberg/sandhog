import {IMarkdownDocumentNode} from "./ast/i-markdown-node";

export interface IMarkdownParserService {
	parse (text: string): IMarkdownDocumentNode;
}