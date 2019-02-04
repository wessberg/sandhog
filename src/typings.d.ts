declare module "markdown-toc" {
	interface Result {
		content: string;
	}

	export default function(content: string): Result;
}
