import toolsJson from "./data/tools.json";

export interface ToolDefinition {
    name: string;
    urlDownload: string;
}

export const TOOLS_DATA: readonly ToolDefinition[] = toolsJson;

export const TOOLS = TOOLS_DATA.map((tool) => tool.name);

export type ToolName = (typeof TOOLS_DATA)[number]["name"];

export function getToolDownloadHref(urlDownload: string): string {
    const path = urlDownload.replace(/^\//, "");
    return `${import.meta.env.BASE_URL}${path}`;
}
