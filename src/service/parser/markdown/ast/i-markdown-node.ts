import {MarkdownNodeKind} from "./markdown-node-kind";

export interface IMarkdownNode {
	type: MarkdownNodeKind;
	raw: string;
	range: MarkdownNodeRange;
	loc: IMarkdownNodeLineLocation;
	parent?: IMarkdownNode;
}

export interface IMarkdownNodeLineLocation {
	start: IMarkdownNodePosition;
	end: IMarkdownNodePosition;
}

export interface IMarkdownNodePosition {
	line: number;
	column: number;
}

export interface IMarkdownDocumentNode extends IMarkdownNode {
	type: MarkdownNodeKind.Document;
	children: MarkdownNode[];
}

export interface IMarkdownHeaderNode extends IMarkdownNode {
	type: MarkdownNodeKind.Header;
	depth: number;
	children: MarkdownNode[];
}

export interface IMarkdownCodeNode extends IMarkdownNode {
	type: MarkdownNodeKind.Code;
	value: string;
}

export interface IMarkdownCodeBlockNode extends IMarkdownNode {
	type: MarkdownNodeKind.CodeBlock;
	value: string;
	lang: string|null;
}

export interface IMarkdownBlockQuoteNode extends IMarkdownNode {
	type: MarkdownNodeKind.BlockQuote;
	children: MarkdownNode[];
}

export interface IMarkdownParagraphNode extends IMarkdownNode {
	type: MarkdownNodeKind.Paragraph;
	children: MarkdownNode[];
}

export interface IMarkdownStrNode extends IMarkdownNode {
	type: MarkdownNodeKind.Str;
	value: string;
}

export interface IMarkdownHtmlNode extends IMarkdownNode {
	type: MarkdownNodeKind.Html;
	value: string;
}

export interface IMarkdownListNode extends IMarkdownNode {
	type: MarkdownNodeKind.List;
	ordered: boolean;
	loose: boolean;
	children: IMarkdownListItemNode[];
}

export interface IMarkdownListItemNode extends IMarkdownNode {
	type: MarkdownNodeKind.ListItem;
	loose: boolean;
	checked: boolean|null;
	children: MarkdownNode[];
}

export interface IMarkdownLinkNode extends IMarkdownNode {
	type: MarkdownNodeKind.Link;
	title: string|null;
	url: string;
	children: MarkdownNode[];
}

export interface IMarkdownLinkReferenceNode extends IMarkdownNode {
	type: MarkdownNodeKind.LinkReference;
	identifier: string;
	referenceType: string;
	children: MarkdownNode[];
}

export interface IMarkdownHorizontalRuleNode extends IMarkdownNode {
	type: MarkdownNodeKind.HorizontalRule;
}

export interface IMarkdownStrongNode extends IMarkdownNode {
	type: MarkdownNodeKind.Strong;
	children: MarkdownNode[];
}

export interface IMarkdownEmphasisNode extends IMarkdownNode {
	type: MarkdownNodeKind.Emphasis;
	children: MarkdownNode[];
}

export interface IMarkdownImageNode extends IMarkdownNode {
	type: MarkdownNodeKind.Image;
	title: string|null;
	url: string;
	alt: string;
}

export interface IMarkdownTableNode extends IMarkdownNode {
	type: MarkdownNodeKind.Table;
	align: [string|null, string|null];
	children: IMarkdownTableRowNode[];
}

export interface IMarkdownTableRowNode extends IMarkdownNode {
	type: MarkdownNodeKind.TableRow;
	children: IMarkdownTableCellNode[];
}

export interface IMarkdownTableCellNode extends IMarkdownNode {
	type: MarkdownNodeKind.TableCell;
	children: MarkdownNode[];
}

/**
 * Range start with 0
 */
export type MarkdownNodeRange = [number, number];

export type MarkdownNode =
	IMarkdownDocumentNode
	|IMarkdownHeaderNode
	|IMarkdownCodeNode
	|IMarkdownCodeBlockNode
	|IMarkdownBlockQuoteNode
	|IMarkdownParagraphNode
	|IMarkdownStrNode
	|IMarkdownHtmlNode
	|IMarkdownListNode
	|IMarkdownListItemNode
	|IMarkdownLinkNode
	|IMarkdownLinkReferenceNode
	|IMarkdownHorizontalRuleNode
	|IMarkdownStrongNode
	|IMarkdownEmphasisNode
	|IMarkdownImageNode
	|IMarkdownTableNode
	|IMarkdownTableRowNode
	|IMarkdownTableCellNode;