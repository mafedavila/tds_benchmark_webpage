import { memo, useMemo } from "react";
import { TOOLS } from "../../calculations";
import { TOOL_LEGEND } from "../LEGENDS";
import VectorPills from "./VectorPills";
import { formatValue, getBarWidthClass, type ColorMode } from "./vectorStyles";

interface VectorDisplayProps {
    w_dataset: number[];
    w_purpose: number[];
    w_hardware: number[];
    showSt?: boolean;
    St?: number[];
    tools?: readonly string[];
}

interface VectorSectionConfig {
    name: string;
    formulaLabel: string;
    values: number[];
    labels: string[];
    maxValue?: number;
    colorMode?: ColorMode;
    showLabels?: boolean;
}

const SectionShell = ({
    name,
    formulaLabel,
    children,
}: {
    name: string;
    formulaLabel: string;
    children: React.ReactNode;
}) => (
    <details className="group rounded-xl border border-gray-200 bg-white shadow-sm" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2">
            <div>
                <p className="text-sm font-semibold text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{formulaLabel}</p>
            </div>
            <span className="text-xs font-semibold text-gray-400 transition-transform group-open:rotate-180">
                v
            </span>
        </summary>
        {children}
    </details>
);

const VectorSection = ({
    name,
    formulaLabel,
    values,
    labels,
    maxValue,
    colorMode = "default",
    showLabels = false,
}: VectorSectionConfig) => (
    <SectionShell name={name} formulaLabel={formulaLabel}>
        <VectorPills
            idPrefix={name}
            values={values}
            labels={labels}
            colorMode={colorMode}
            maxValue={maxValue}
            showLabels={showLabels}
            showValueInTitle
            className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-3"
        />
    </SectionShell>
);

const StRanking = ({
    scores,
    tools,
}: {
    scores: number[];
    tools: readonly string[];
}) => {
    const rankedTools = useMemo(
        () =>
            scores
                .map((score, index) => ({ name: tools[index] ?? `Tool ${index + 1}`, score }))
                .sort((left, right) => right.score - left.score),
        [scores, tools],
    );

    return (
        <div className="space-y-2 border-t border-gray-100 px-3 py-3">
            {rankedTools.map((tool) => {
                const scorePercentage = Math.min(Math.max(tool.score, 0), 100);

                return (
                    <div key={tool.name} title={`${tool.name}: ${formatValue(scorePercentage)}%`}>
                        <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                            <span className="truncate font-medium text-gray-700">{tool.name}</span>
                            <span className="font-semibold tabular-nums text-gray-500">
                                {formatValue(scorePercentage)}%
                            </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                                className={`h-full rounded-full bg-amber-400 transition-all duration-300 ${getBarWidthClass(
                                    scorePercentage,
                                )}`}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const StSection = ({
    St,
    tools,
}: {
    St: number[];
    tools: readonly string[];
}) => (
    <SectionShell name="St" formulaLabel={`St [1x${St.length}]`}>
        <VectorPills
            idPrefix="St"
            values={St}
            labels={[...tools]}
            colorMode="ranked"
            maxValue={100}
            showLabels
            showValueInTitle
            className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-3"
        />
        <StRanking scores={St} tools={tools} />
    </SectionShell>
);

function VectorDisplayComponent({
    w_dataset,
    w_purpose,
    w_hardware,
    showSt = false,
    St = [],
    tools = TOOLS,
}: VectorDisplayProps) {
    const sections = useMemo<VectorSectionConfig[]>(() => {
        const toolLabels = [...tools];

        return (
            [
                {
                    name: "w_dataset",
                    formulaLabel: `w_dataset [1x${w_dataset.length}]`,
                    values: w_dataset,
                    labels: toolLabels,
                    maxValue: 1,
                    colorMode: "dataset-compatibility",
                    showLabels: true,
                },
                {
                    name: "w_purpose",
                    formulaLabel: `w_purpose [1x${w_purpose.length}]`,
                    values: w_purpose,
                    labels: toolLabels,
                    maxValue: 1,
                    colorMode: "inverse_ranked",
                    showLabels: true,
                },
                {
                    name: "w_hardware",
                    formulaLabel: `w_hardware [1x${w_hardware.length}]`,
                    values: w_hardware,
                    labels: TOOL_LEGEND,
                    maxValue: 1.5,
                    colorMode: "inverse_ranked",
                    showLabels: true,
                },
            ] satisfies VectorSectionConfig[]
        ).filter((section) => section.values.length > 0);
    }, [tools, w_dataset, w_hardware, w_purpose]);

    return (
        <aside className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-3">
            <div>
                <h2 className="text-sm font-bold text-gray-900">Computed vectors</h2>
                <p className="text-xs text-gray-500">Results</p>
            </div>

            <div className="space-y-2">
                {sections.map((section) => (
                    <VectorSection key={section.name} {...section} />
                ))}

                {showSt && St.length > 0 && <StSection St={St} tools={tools} />}
            </div>
        </aside>
    );
}

const VectorDisplay = memo(VectorDisplayComponent);

export default VectorDisplay;
