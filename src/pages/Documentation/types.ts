export type ParagraphBlock = {
	type: "paragraph";
	text: string;
};

export type ListBlock = {
	type: "list";
	style?: "ordered" | "unordered";
	items: string[];
};

export type CodeBlock = {
	type: "code";
	language?: string;
	title?: string;
	code: string;
};

export type ImageBlock = {
	type: "image";
	alt: string;
	caption?: string;
	src?: string;
	assetKey?: "computer" | "diagram";
};

export type NoteBlock = {
	type: "note";
	variant?: "info" | "warning";
	text: string;
};

export type DocContentBlock = ParagraphBlock | ListBlock | CodeBlock | ImageBlock | NoteBlock;

export type DocSection = {
	id: string;
	title: string;
	summary: string;
	content: DocContentBlock[];
};

