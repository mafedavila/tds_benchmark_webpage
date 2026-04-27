import { memo } from "react";

interface VectorDisplayProps {
    R_dataset: number[];
    w_dataset: number[];
    B_purpose: number[];
    w_purpose: number[];
    R_hardware: number[];
    w_hardware: number[];
    Ft: number[];
    showSt?: boolean;
    St?: number[];
    tools?: string[];
}

interface VectorConfig {
    name: string;
    formulaLabel: string;
    values: number[];
    labels: string[];
    maxValue?: number;
}

const DEFAULT_TOOLS = [
    "AutoDiff",
    "CTABGAN+",
    "CTGAN",
    "GANBLR++",
    "GReaT",
    "REaLTabFormer",
    "SMOTE",
    "TabDDPM",
    "TabSyn",
    "TabuLaMiddle",
    "TVAE",
];

const DATASET_LABELS = [
    "Categorical",
    "Numerical",
    "Temporal",
    "Text",
    "Mixed Cat/Num",
    "2 Tables",
    "N Tables",
];

const PURPOSE_LABELS = [
    "Data Augmentation",
    "Dataset Balancing",
    "Missing Value Imputation",
    "Customized Generation",
    "Privacy Preservation",
];

const HARDWARE_LABELS = ["CPU", "Memory", "GPU", "Runtime"];

const formatValue = (value: number) => {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
};

const isBinaryValue = (value: number) => value === 0 || value === 1;

const getValueClasses = (value: number, maxValue: number) => {
    if (isBinaryValue(value)) {
        return value === 1
            ? "border-amber-400 bg-amber-400 text-amber-950"
            : "border-gray-200 bg-gray-100 text-gray-500";
    }

    const normalizedValue = maxValue > 0 ? Math.min(Math.max(value / maxValue, 0), 1) : 0;

    if (normalizedValue >= 0.8) {
        return "border-amber-400 bg-amber-400 text-amber-950";
    }

    if (normalizedValue >= 0.6) {
        return "border-amber-300 bg-amber-300 text-amber-950";
    }

    if (normalizedValue >= 0.4) {
        return "border-amber-200 bg-amber-200 text-amber-900";
    }

    if (normalizedValue > 0) {
        return "border-amber-100 bg-amber-100 text-amber-800";
    }

    return "border-gray-200 bg-gray-100 text-gray-500";
};

const getBarWidthClass = (percentage: number) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

    if (normalizedPercentage >= 95) return "w-full";
    if (normalizedPercentage >= 85) return "w-[90%]";
    if (normalizedPercentage >= 75) return "w-[80%]";
    if (normalizedPercentage >= 65) return "w-[70%]";
    if (normalizedPercentage >= 55) return "w-[60%]";
    if (normalizedPercentage >= 45) return "w-[50%]";
    if (normalizedPercentage >= 35) return "w-[40%]";
    if (normalizedPercentage >= 25) return "w-[30%]";
    if (normalizedPercentage >= 15) return "w-[20%]";
    if (normalizedPercentage > 0) return "w-[10%]";

    return "w-0";
};

const VectorSection = ({ name, formulaLabel, values, labels, maxValue }: VectorConfig) => {
    const resolvedMaxValue = maxValue ?? Math.max(...values, 1);

    return (
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

            <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-3">
                {values.map((value, index) => {
                    const label = labels[index] ?? `Position ${index}`;

                    return (
                        <span
                            key={`${name}-${index}`}
                            title={`Position ${index}: ${label}`}
                            className={`rounded-full border px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-300 ${getValueClasses(
                                value,
                                resolvedMaxValue,
                            )}`}
                        >
                            {formatValue(value)}
                        </span>
                    );
                })}
            </div>
        </details>
    );
};

const StRanking = ({ scores, tools }: { scores: number[]; tools: string[] }) => {
    const rankedTools = scores
        .map((score, index) => ({ name: tools[index] ?? `Tool ${index + 1}`, score }))
        .sort((left, right) => right.score - left.score);

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

function VectorDisplayComponent({
    R_dataset,
    B_purpose,
    R_hardware,
    w_dataset,
    w_purpose,
    w_hardware,
    Ft,
    showSt = false,
    St = [],
    tools = DEFAULT_TOOLS,
}: VectorDisplayProps) {
    const vectorSections: VectorConfig[] = [
        {
            name: "R_dataset",
            formulaLabel: `R_dataset [1×${R_dataset.length}]`,
            values: R_dataset,
            labels: DATASET_LABELS,
            maxValue: 1,
        },
        {
            name: "B_purpose",
            formulaLabel: `B_purpose [1×${B_purpose.length}]`,
            values: B_purpose,
            labels: PURPOSE_LABELS,
            maxValue: 1,
        },
        {
            name: "R_hardware",
            formulaLabel: `R_hardware [1×${R_hardware.length}]`,
            values: R_hardware,
            labels: HARDWARE_LABELS,
            maxValue: 1.5,
        },
        {
            name: "w_dataset",
            formulaLabel: `w_dataset [1×${w_dataset.length}]`,
            values: w_dataset,
            labels: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11"],
            maxValue: 1,
        },
        {
            name: "w_purpose",
            formulaLabel: `w_purpose [1×${w_purpose.length}]`,
            values: w_purpose,
            labels: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11"],
            maxValue: 1,
        },
        {
            name: "w_hardware",
            formulaLabel: `w_hardware [1×${w_hardware.length}]`,
            values: w_hardware,
            labels: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11"],
            maxValue: 1,
        },
        {
            name: "Ft",
            formulaLabel: `Ft [1×${Ft.length}]`,
            values: Ft,
            labels: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9", "x10", "x11"],
            maxValue: 1,
        },
    ].filter((section) => section.values.length > 0);

    return (
        <aside className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-3">
            <div>
                <h2 className="text-sm font-bold text-gray-900">Computed vectors</h2>
                <p className="text-xs text-gray-500">Updates as answers change</p>
            </div>

            <div className="space-y-2">
                {vectorSections.map((section) => (
                    <VectorSection key={section.name} {...section} />
                ))}

                {showSt && (
                    <details className="group rounded-xl border border-gray-200 bg-white shadow-sm" open>
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">St</p>
                                <p className="text-xs text-gray-500">St [1×{St.length}]</p>
                            </div>
                            <span className="text-xs font-semibold text-gray-400 transition-transform group-open:rotate-180">
                                v
                            </span>
                        </summary>

                        <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-3 py-3">
                            {St.map((value, index) => {
                                const toolName = tools[index] ?? `Tool ${index + 1}`;

                                return (
                                    <span
                                        key={`St-${toolName}`}
                                        title={`Position ${index}: ${toolName}`}
                                        className={`rounded-full border px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-300 ${getValueClasses(
                                            value,
                                            100,
                                        )}`}
                                    >
                                        {formatValue(value)}
                                    </span>
                                );
                            })}
                        </div>

                        <StRanking scores={St} tools={tools} />
                    </details>
                )}
            </div>
        </aside>
    );
}

const VectorDisplay = memo(VectorDisplayComponent);

export default VectorDisplay;
