import { DATASET_CATALOG } from "../../data/datasetsCatalog";
import { SMOTE_RUN_TOOL_PY } from "../../generators/runToolPy";
import { useContribution } from "../../store";

const SMOTE_REQUIREMENTS = [
    "pandas",
    "numpy",
    "scikit-learn",
    "imbalanced-learn",
] as const;

export function ToolNameStep() {
    const { state, dispatch } = useContribution();

    const loadSmoteExample = () => {
        const diabetesDataset = DATASET_CATALOG.find((entry) => entry.dataset === "diabetes");

        if (!diabetesDataset) {
            return;
        }

        dispatch({ type: "setToolName", toolName: "smote" });
        dispatch({ type: "setPythonVersion", pythonVersion: "3.9" });
        dispatch({ type: "setRequirements", requirements: [...SMOTE_REQUIREMENTS] });
        dispatch({ type: "setNeedsSpecialTorch", needsSpecialTorch: false });
        dispatch({ type: "setSpecialTorchCommand", specialTorchCommand: "" });
        dispatch({
            type: "setExperiments",
            experiments: [{ toolname: "smote", ...diabetesDataset }],
        });
        dispatch({ type: "setRunToolModelCode", runToolModelCode: SMOTE_RUN_TOOL_PY });
        dispatch({ type: "setResults", results: { perDataset: [] } });
        dispatch({ type: "setWantsToContribute", wantsToContribute: null });
        dispatch({ type: "setContributionType", contributionType: null });
    };

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <label className="block">
                    <span className="text-sm font-semibold text-gray-800">Name your tool</span>
                    <input
                        type="text"
                        value={state.toolName}
                        onChange={(event) => dispatch({ type: "setToolName", toolName: event.target.value })}
                        placeholder="ctgan, smote, tabddpm..."
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>

                <button
                    type="button"
                    onClick={loadSmoteExample}
                    className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
                >
                    View Example (SMOTE)
                </button>
            </div>

            {state.experiments.length > 0 ? (
                <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">Example loaded</p>
                    <p className="mt-1">
                        Dataset: {state.experiments[0].dataset} · Target: {state.experiments[0].target} · Python:{" "}
                        {state.pythonVersion}
                    </p>
                </div>
            ) : null}
        </div>
    );
}
