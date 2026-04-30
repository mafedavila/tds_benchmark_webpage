export type ColorMode = "default" | "dataset-compatibility" | "ranked";

export const formatValue = (value: number): string => {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
};

const isBinaryValue = (value: number) => value === 0 || value === 1;

const AMBER_THRESHOLDS = [
    { min: 0.8, classes: "border-amber-400 bg-amber-400 text-amber-950" },
    { min: 0.6, classes: "border-amber-300 bg-amber-300 text-amber-950" },
    { min: 0.4, classes: "border-amber-200 bg-amber-200 text-amber-900" },
    { min: 0,   classes: "border-amber-100 bg-amber-100 text-amber-800" },
] as const;

const NEUTRAL_PILL = "border-gray-200 bg-gray-100 text-gray-500";
const ACTIVE_BINARY_PILL = "border-amber-400 bg-amber-400 text-amber-950";

const getValueClasses = (value: number, maxValue: number): string => {
    if (isBinaryValue(value)) {
        return value === 1 ? ACTIVE_BINARY_PILL : NEUTRAL_PILL;
    }

    const normalized = maxValue > 0 ? Math.min(Math.max(value / maxValue, 0), 1) : 0;
    if (normalized <= 0) return NEUTRAL_PILL;

    return (AMBER_THRESHOLDS.find((threshold) => normalized >= threshold.min) ?? AMBER_THRESHOLDS[3]).classes;
};

const getDatasetCompatibilityClasses = (value: number, maxValue: number): string =>
    value === maxValue
        ? "border-emerald-400 bg-emerald-400 text-emerald-950"
        : "border-red-300 bg-red-200 text-red-800";

const getRankedColorClasses = (rank: number, total: number): string => {
    if (rank === 0) return "border-emerald-500 bg-emerald-500 text-white";
    if (rank === total - 1) return "border-red-500 bg-red-500 text-white";

    return "border-yellow-400 bg-yellow-400 text-yellow-950";
};

export const getRankedIndices = (values: number[]): number[] =>
    values
        .map((value, index) => ({ value, index }))
        .sort((left, right) => right.value - left.value)
        .map((item, rank) => ({ index: item.index, rank }))
        .sort((left, right) => left.index - right.index)
        .map((item) => item.rank);

export interface PillClassOptions {
    colorMode?: ColorMode;
    /** Override the max used by "default" coloring (e.g. 100 for percentage scores). */
    maxValue?: number;
    /** Pre-computed ranked indices to avoid re-sorting per pill in "ranked" mode. */
    rankedIndices?: number[];
}

export const getPillClassName = (
    value: number,
    values: number[],
    index: number,
    { colorMode = "default", maxValue, rankedIndices }: PillClassOptions = {},
): string => {
    if (colorMode === "dataset-compatibility") {
        return getDatasetCompatibilityClasses(value, Math.max(...values));
    }

    if (colorMode === "ranked") {
        const ranks = rankedIndices ?? getRankedIndices(values);
        return getRankedColorClasses(ranks[index] ?? 0, values.length);
    }

    return getValueClasses(value, maxValue ?? Math.max(...values, 1));
};

const BAR_WIDTH_STEPS = [
    { min: 95, className: "w-full" },
    { min: 85, className: "w-[90%]" },
    { min: 75, className: "w-[80%]" },
    { min: 65, className: "w-[70%]" },
    { min: 55, className: "w-[60%]" },
    { min: 45, className: "w-[50%]" },
    { min: 35, className: "w-[40%]" },
    { min: 25, className: "w-[30%]" },
    { min: 15, className: "w-[20%]" },
    { min:  0, className: "w-[10%]" },
] as const;

export const getBarWidthClass = (percentage: number): string => {
    const clamped = Math.min(Math.max(percentage, 0), 100);
    if (clamped <= 0) return "w-0";

    return (BAR_WIDTH_STEPS.find((step) => clamped >= step.min) ?? BAR_WIDTH_STEPS[BAR_WIDTH_STEPS.length - 1]).className;
};
