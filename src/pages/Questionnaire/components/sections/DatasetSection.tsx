import { useQuestionnaire } from "../../store";
import { ColumnType, type TableCount } from "../../types";
import { useMemo } from "react";
import { computeRDataset, computeWDataset } from "../../calculations";
import ToolRanking from "../ui/ToolRanking";

const COLUMN_TYPE_OPTIONS = [
    { value: ColumnType.Categorical, label: "Categorical" },
    { value: ColumnType.Numerical, label: "Numerical" },
    { value: ColumnType.Temporal, label: "Temporal" },
    { value: ColumnType.Text, label: "Text" },
    { value: ColumnType.Mixed, label: "Mixed (Cat/Num)" },
];

export default function DatasetSection() {
    const { state, dispatch } = useQuestionnaire();
    const wDataset = useMemo(() => {
        const R = computeRDataset(state.selectedColumnTypes, state.tableCount);
        return computeWDataset(R);
    }, [state.selectedColumnTypes, state.tableCount]);

    const toggleColumnType = (columnType: ColumnType) => {
        const selectedColumnTypes = state.selectedColumnTypes.includes(columnType)
            ? state.selectedColumnTypes.filter((selectedType) => selectedType !== columnType)
            : [...state.selectedColumnTypes, columnType];

        dispatch({ type: "setSelectedColumnTypes", selectedColumnTypes });
    };

    const setTableCount = (tableCount: TableCount) => {
        dispatch({ type: "setTableCount", tableCount });
    };

    return (
        <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Dataset</h2>
                <p className="text-sm text-gray-600">Describe the structure of the data you want to synthesize.</p>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Column types</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                    {COLUMN_TYPE_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                            <input
                                type="checkbox"
                                checked={state.selectedColumnTypes.includes(option.value)}
                                onChange={() => toggleColumnType(option.value)}
                                className="h-4 w-4 accent-amber-500"
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Generate more than one table?</h3>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:flex-1">
                        <input
                            type="radio"
                            name="generate-multiple-tables"
                            checked={state.tableCount !== "none"}
                            onChange={() => setTableCount("two")}
                            className="h-4 w-4 accent-amber-500"
                        />
                        <span>Yes</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:flex-1">
                        <input
                            type="radio"
                            name="generate-multiple-tables"
                            checked={state.tableCount === "none"}
                            onChange={() => setTableCount("none")}
                            className="h-4 w-4 accent-amber-500"
                        />
                        <span>No</span>
                    </label>
                </div>
            </div>

            {state.tableCount !== "none" && (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">How many tables?</h3>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:flex-1">
                            <input
                                type="radio"
                                name="table-count"
                                checked={state.tableCount === "two"}
                                onChange={() => setTableCount("two")}
                                className="h-4 w-4 accent-amber-500"
                            />
                            <span>2 tables</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50 sm:flex-1">
                            <input
                                type="radio"
                                name="table-count"
                                checked={state.tableCount === "more"}
                                onChange={() => setTableCount("more")}
                                className="h-4 w-4 accent-amber-500"
                            />
                            <span>More than 2 tables</span>
                        </label>
                    </div>
                </div>
            )}

            <ToolRanking wDataset={wDataset} />
        </section>
    );
}
