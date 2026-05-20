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
    /** When true, renders the label text visibly below the value inside each pill. */
    showLabels?: boolean;
    className?: string;
}

const PILL_INLINE =
    "rounded-full border px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-200";

const PILL_STACKED =
    "inline-flex flex-col items-center gap-0.5 rounded-lg border px-2 py-1.5 transition-colors duration-200";

function VectorPillsComponent({
    values,
    labels,
    idPrefix,
    colorMode = "default",
    maxValue,
    showValueInTitle = false,
    showLabels = false,
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
                const colorClass = getPillClassName(value, values, index, {
                    colorMode,
                    maxValue,
                    rankedIndices,
                });

                if (showLabels) {
                    return (
                        <span
                            key={`${idPrefix}-${index}`}
                            title={title}
                            className={`${PILL_STACKED} ${colorClass}`}
                        >
                            <span className="tabular-nums text-xs font-semibold leading-none">
                                {formatValue(value)}
                            </span>
                            <span className="max-w-[5.5rem] truncate text-[9px] font-medium leading-none opacity-80">
                                {label}
                            </span>
                        </span>
                    );
                }

                return (
                    <span
                        key={`${idPrefix}-${index}`}
                        title={title}
                        className={`${PILL_INLINE} ${colorClass}`}
                    >
                        {formatValue(value)}
                    </span>
                );
            })}
        </div>
    );
}

export default memo(VectorPillsComponent);
