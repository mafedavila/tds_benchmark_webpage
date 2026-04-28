import { useMemo } from "react";
import { TOOLS } from "../../calculations";

interface ToolRankingProps {
    wDataset: number[];
}

export default function ToolRanking({ wDataset }: ToolRankingProps) {
    const topTools = useMemo(() => {
        const scoredTools = TOOLS.map((name, index) => ({ name, score: wDataset[index] ?? 0 }));
        const maxScore = Math.max(...scoredTools.map((tool) => tool.score), 0);

        return scoredTools.filter((tool) => tool.score > 0 && tool.score === maxScore);
    }, [wDataset]);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">Top compatible tools</p>
            <p className="mt-0.5 text-xs text-gray-500">
                Tools with the highest dataset compatibility score
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
                {topTools.length > 0 ? (
                    topTools.map((tool) => (
                        <span
                            key={tool.name}
                            className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800"
                        >
                            {tool.name} · {tool.score}
                        </span>
                    ))
                ) : (
                    <p className="text-xs text-gray-500">
                        Select a dataset type to see the top compatible tools.
                    </p>
                )}
            </div>
        </div>
    );
}