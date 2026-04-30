import { memo, useMemo } from "react";
import {
    formatValue,
    getPillClassName,
    getRankedIndices,
    type ColorMode,
} from "./vectorStyles";

interface VectorPillsProps {
    values: number[];
    labels: string[];
    idPrefix: string;
    colorMode?: ColorMode;
    /** Override the implicit max used by the "default" color mode (e.g. 100 for St). */
    maxValue?: number;
    /** When true, the pill tooltip shows "label: value"; otherwise just the label. */
    showValueInTitle?: boolean;
    className?: string;
}

const PILL_BASE_CLASS =
    "rounded-full border px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-200";

function VectorPillsComponent({
    values,
    labels,
    idPrefix,
    colorMode = "default",
    maxValue,
    showValueInTitle = false,
    className = "flex flex-wrap gap-1.5",
}: VectorPillsProps) {
    const rankedIndices = useMemo(
        () => (colorMode === "ranked" ? getRankedIndices(values) : undefined),
        [colorMode, values],
    );

    return (
        <div className={className}>
            {values.map((value, index) => {
                const label = labels[index] ?? `Position ${index}`;
                const title = showValueInTitle ? `${label}: ${formatValue(value)}` : label;

                return (
                    <span
                        key={`${idPrefix}-${index}`}
                        title={title}
                        className={`${PILL_BASE_CLASS} ${getPillClassName(value, values, index, {
                            colorMode,
                            maxValue,
                            rankedIndices,
                        })}`}
                    >
                        {formatValue(value)}
                    </span>
                );
            })}
        </div>
    );
}

export default memo(VectorPillsComponent);
