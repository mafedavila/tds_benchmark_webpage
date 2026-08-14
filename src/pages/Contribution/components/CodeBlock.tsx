import { useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    height?: boolean;
}

export function CodeBlock({ code, language = "text", title, height }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const displayCode = code || "\n";
    const normalizedLanguage = language.toLowerCase() === "py" ? "python" : language.toLowerCase();
    const highlightedCode = useMemo(() => {
        const grammar = Prism.languages[normalizedLanguage];

        return grammar
            ? Prism.highlight(displayCode, grammar, normalizedLanguage)
            : null;
    }, [displayCode, normalizedLanguage]);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
    };

    return (
        <div className="code-block-vscode overflow-hidden rounded-lg border border-[#3c3c3c] bg-[#1e1e1e] shadow-sm">

            <div className="flex items-center justify-between gap-3 border-b border-[#3c3c3c] bg-[#252526] px-4 py-2">
                <div className="min-w-0">
                    {title ? <p className="truncate text-sm font-semibold text-white">{title}</p> : null}
                    <p className="text-xs uppercase tracking-wide text-[#9d9d9d]">{language}</p>
                </div>
                <button
                    type="button"
                    onClick={copyCode}
                    className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10"
                >
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className={`${height ? "h-full max-h-150" : "max-h-72"} overflow-auto p-4 font-mono text-sm leading-6 text-[#d4d4d4]`}>
                {highlightedCode ? (
                    <code
                        className={`language-${normalizedLanguage}`}
                        dangerouslySetInnerHTML={{ __html: highlightedCode }}
                    />
                ) : (
                    <code>{displayCode}</code>
                )}
            </pre>
        </div>
    );
}
