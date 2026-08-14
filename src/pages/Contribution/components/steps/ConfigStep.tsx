import { useMemo, useState } from "react";

import { CodeBlock } from "../CodeBlock";
import { DATASET_CATALOG } from "../../data/datasetsCatalog";
import { generateConfigJson } from "../../generators/configJson";
import { useContribution } from "../../store";
import type { ColumnTypes, ContributorExperiment, DatasetCatalogEntry } from "../../types";

type ArrayColumnKey = "categorical" | "continuous" | "integer" | "log" | "general" | "non_categorical";

const ARRAY_COLUMN_KEYS: readonly ArrayColumnKey[] = [
    "categorical",
    "continuous",
    "integer",
    "log",
    "general",
    "non_categorical",
] as const;

const FIELD_TOOLTIPS: Record<ArrayColumnKey | "mixed", string> = {
    categorical: "Columns treated as categorical variables, including labels or discrete classes.",
    continuous: "Numeric columns treated as continuous variables.",
    integer: "Numeric columns that should remain integer-valued after synthesis.",
    mixed: "Columns with special discrete values inside an otherwise continuous distribution.",
    log: "Columns whose distribution should be transformed or interpreted in log scale.",
    general: "General feature columns used by benchmark tools when they need a broad input list.",
    non_categorical: "Columns explicitly treated as not categorical, even if they contain discrete-looking values.",
};

function cloneColumns(columns: ColumnTypes): ColumnTypes {
    return {
        categorical: [...columns.categorical],
        continuous: [...columns.continuous],
        integer: [...columns.integer],
        mixed: Object.fromEntries(
            Object.entries(columns.mixed).map(([column, values]) => [column, [...values]]),
        ),
        log: [...columns.log],
        general: [...columns.general],
        non_categorical: [...columns.non_categorical],
    };
}

function catalogToExperiment(entry: DatasetCatalogEntry, toolName: string): ContributorExperiment {
    return {
        toolname: toolName.trim(),
        dataset: entry.dataset,
        problem_type: entry.problem_type,
        target: entry.target,
        columns: cloneColumns(entry.columns),
    };
}

function TooltipLabel({ field }: { field: ArrayColumnKey | "mixed" }) {
    return (
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800">
            {field}
            <span
                title={FIELD_TOOLTIPS[field]}
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-bold text-gray-500"
            >
                ?
            </span>
        </span>
    );
}

interface ChipsInputProps {
    field: ArrayColumnKey;
    values: string[];
    onChange: (values: string[]) => void;
}

function ChipsInput({ field, values, onChange }: ChipsInputProps) {
    const [draft, setDraft] = useState("");

    const addChip = () => {
        const value = draft.trim();

        if (!value || values.includes(value)) {
            setDraft("");
            return;
        }

        onChange([...values, value]);
        setDraft("");
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <TooltipLabel field={field} />
            <div className="mt-3 flex flex-wrap gap-2">
                {values.map((value) => (
                    <span
                        key={value}
                        className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-900"
                    >
                        <span className="truncate">{value}</span>
                        <button
                            type="button"
                            onClick={() => onChange(values.filter((item) => item !== value))}
                            className="text-amber-700 transition hover:text-red-600"
                            aria-label={`Remove ${value}`}
                        >
                            x
                        </button>
                    </span>
                ))}
            </div>
            <div className="mt-3 flex gap-2">
                <input
                    type="text"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            addChip();
                        }
                    }}
                    placeholder="Add Column"
                    className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
                <button
                    type="button"
                    onClick={addChip}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-amber-400 hover:text-amber-700"
                >
                    Add Column
                </button>
            </div>
        </div>
    );
}

interface MixedColumnsInputProps {
    value: Record<string, number[]>;
    onChange: (value: Record<string, number[]>) => void;
}

function MixedColumnsInput({ value, onChange }: MixedColumnsInputProps) {
    const entries = Object.entries(value);

    const updateEntry = (oldColumn: string, nextColumn: string, rawValues: string) => {
        const next = { ...value };
        delete next[oldColumn];

        if (nextColumn.trim()) {
            next[nextColumn.trim()] = rawValues
                .split(",")
                .map((item) => Number(item.trim()))
                .filter((item) => !Number.isNaN(item));
        }

        onChange(next);
    };

    const addEntry = () => {
        const base = "column";
        let index = entries.length + 1;
        let key = `${base}_${index}`;

        while (Object.hasOwn(value, key)) {
            index += 1;
            key = `${base}_${index}`;
        }

        onChange({ ...value, [key]: [] });
    };

    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center justify-between gap-3">
                <TooltipLabel field="mixed" />
                <button
                    type="button"
                    onClick={addEntry}
                    className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-amber-400 hover:text-amber-700"
                >
                    Agregar
                </button>
            </div>

            <div className="mt-3 space-y-3">
                {entries.length === 0 ? (
                    <p className="text-sm text-gray-500">Sin columnas mixtas.</p>
                ) : null}

                {entries.map(([column, values]) => (
                    <div key={column} className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                        <input
                            type="text"
                            value={column}
                            onChange={(event) => updateEntry(column, event.target.value, values.join(", "))}
                            placeholder="Columna"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                        <input
                            type="text"
                            value={values.join(", ")}
                            onChange={(event) => updateEntry(column, column, event.target.value)}
                            placeholder="0, -1"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const next = { ...value };
                                delete next[column];
                                onChange(next);
                            }}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-red-200 hover:text-red-600"
                        >
                            Quitar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ConfigStep() {
    const { state, dispatch } = useContribution();
    const [selectedDataset, setSelectedDataset] = useState(DATASET_CATALOG[0]?.dataset ?? "");

    const selectedDatasets = useMemo(
        () => new Set(state.experiments.map((experiment) => experiment.dataset)),
        [state.experiments],
    );
    const availableDatasets = useMemo(
        () => DATASET_CATALOG.filter((entry) => !selectedDatasets.has(entry.dataset)),
        [selectedDatasets],
    );
    const selectedDatasetIsAvailable = availableDatasets.some(
        (entry) => entry.dataset === selectedDataset,
    );
    const activeDataset = selectedDatasetIsAvailable
        ? selectedDataset
        : (availableDatasets[0]?.dataset ?? "");

    const updateExperiments = (experiments: ContributorExperiment[]) => {
        dispatch({ type: "setExperiments", experiments });
    };

    const addDataset = () => {
        const entry = availableDatasets.find((dataset) => dataset.dataset === activeDataset);

        if (!entry || selectedDatasets.has(entry.dataset)) {
            return;
        }

        updateExperiments([...state.experiments, catalogToExperiment(entry, state.toolName)]);
        const nextAvailable = availableDatasets.find((dataset) => dataset.dataset !== entry.dataset);
        setSelectedDataset(nextAvailable?.dataset ?? "");
    };

    const updateExperiment = (index: number, patch: Partial<ContributorExperiment>) => {
        updateExperiments(
            state.experiments.map((experiment, experimentIndex) => (
                experimentIndex === index ? { ...experiment, ...patch } : experiment
            )),
        );
    };

    const updateColumns = (index: number, patch: Partial<ColumnTypes>) => {
        const experiment = state.experiments[index];

        if (!experiment) {
            return;
        }

        updateExperiment(index, {
            columns: {
                ...experiment.columns,
                ...patch,
            },
        });
    };

    const configPreview = generateConfigJson(state);

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
            <div className="space-y-5">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-800">Add Dataset</span>
                        <div className="mt-2 flex gap-2">
                            <select
                                value={activeDataset}
                                onChange={(event) => setSelectedDataset(event.target.value)}
                                disabled={availableDatasets.length === 0}
                                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                            >
                                {availableDatasets.length === 0 ? (
                                    <option value="">All datasets have been added</option>
                                ) : null}
                                {availableDatasets.map((entry) => (
                                    <option key={entry.dataset} value={entry.dataset}>
                                        {entry.dataset}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={addDataset}
                                disabled={availableDatasets.length === 0}
                                className="rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                            >
                                Add
                            </button>
                        </div>
                    </label>
                </div>

                {state.experiments.length === 0 ? (
                    <div className="rounded-2xl bg-white p-6 text-sm text-gray-600 shadow-sm">
                        <p className="font-semibold text-gray-900">No datasets selected</p>
                        <p className="mt-1">Select at least one dataset to generate the config.</p>
                    </div>
                ) : null}

                {state.experiments.map((experiment, index) => (
                    <section key={experiment.dataset} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{experiment.dataset}</h3>
                                <p className="mt-1 text-sm text-gray-600">Config autocompleted from the catalog.</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => updateExperiments(state.experiments.filter((_, itemIndex) => itemIndex !== index))}
                                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-500 transition hover:border-red-200 hover:text-red-600"
                            >
                                Remove Dataset
                            </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <label className="block">
                                <span className="text-sm font-semibold text-gray-800">problem_type</span>
                                <input
                                    type="text"
                                    value={experiment.problem_type}
                                    readOnly
                                    aria-readonly="true"
                                    className="mt-2 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-600"
                                />
                            </label>
                            <label className="block">
                                <span className="text-sm font-semibold text-gray-800">target</span>
                                <input
                                    type="text"
                                    value={experiment.target}
                                    readOnly
                                    aria-readonly="true"
                                    className="mt-2 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-600"
                                />
                            </label>
                        </div>

                        <div className="grid gap-3">
                            {ARRAY_COLUMN_KEYS.map((field) => (
                                <ChipsInput
                                    key={field}
                                    field={field}
                                    values={experiment.columns[field]}
                                    onChange={(values) => updateColumns(index, { [field]: values })}
                                />
                            ))}
                            <MixedColumnsInput
                                value={experiment.columns.mixed}
                                onChange={(mixed) => updateColumns(index, { mixed })}
                            />
                        </div>
                    </section>
                ))}
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start rounded-2xl bg-white p-6 shadow-sm">
                <CodeBlock title="config.json" language="json" code={configPreview} height={true} />
            </div>
        </div>
    );
}
