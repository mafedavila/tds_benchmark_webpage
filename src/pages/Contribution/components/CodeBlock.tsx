import { useState } from "react";

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    height?: boolean;
}

export function CodeBlock({ code, language = "text", title, height }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className={`overflow-hidden rounded-lg border border-gray-200 bg-gray-950 shadow-sm`}>

            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
                <div className="min-w-0">
                    {title ? <p className="truncate text-sm font-semibold text-white">{title}</p> : null}
                    <p className="text-xs uppercase tracking-wide text-gray-400">{language}</p>
                </div>
                <button
                    type="button"
                    onClick={copyCode}
                    className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className={`h-${height ? "full max-h-150" : "max-h-72"} overflow-auto p-4 text-sm leading-6 text-gray-100`}>
                <code>{code || "\n"}</code>
            </pre>
        </div>
    );
}
