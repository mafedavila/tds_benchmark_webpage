import { CodeBlock } from "../CodeBlock";
import { generatePythonVersionTxt } from "../../generators/pythonVersionTxt";
import { generateRequirementsTxt } from "../../generators/requirementsTxt";
import { useContribution } from "../../store";

interface DependencyRow {
    name: string;
    version: string;
}

function parseRequirement(requirement: string): DependencyRow {
    const match = requirement.match(/^(.+?)(?:==(.+))?$/);

    return {
        name: match?.[1]?.trim() ?? requirement,
        version: match?.[2]?.trim() ?? "",
    };
}

function serializeRequirement(row: DependencyRow): string {
    const name = row.name.trim();
    const version = row.version.trim();

    return version ? `${name}==${version}` : name;
}

export function RequirementsStep() {
    const { state, dispatch } = useContribution();
    const rows = state.requirements.length > 0
        ? state.requirements.map(parseRequirement)
        : [
            { name: "pandas", version: "" },
            { name: "numpy", version: "" },
            { name: "scikit-learn", version: "" },
        ];

    
    const setRows = (nextRows: DependencyRow[]) => {
        dispatch({
            type: "setRequirements",
            requirements: nextRows
                .map(serializeRequirement)
                .map((requirement) => requirement.trim()),
        });
    };


    const addRow = () => {
        setRows([...rows, { name: "", version: "" }]);
        console.log("Added row, new rows:", [...rows, { name: "", version: "" }]);
    }

    const updateRow = (index: number, patch: Partial<DependencyRow>) => {
        setRows(rows.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row)));
    };

    const removeRow = (index: number) => {
        if (index < 3) {
            return;
        }

        setRows(rows.filter((_, rowIndex) => rowIndex !== index));
    };

    const requirementsPreview = generateRequirementsTxt(state);
    const pythonPreview = generatePythonVersionTxt(state);

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
                <label className="block">
                    <span className="text-sm font-semibold text-gray-800">Python version</span>
                    <input
                        type="text"
                        value={state.pythonVersion}
                        onChange={(event) => dispatch({ type: "setPythonVersion", pythonVersion: event.target.value })}
                        placeholder="3.9"
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>

                <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold text-gray-800">Dependencies</h3>
                        <button
                            type="button"
                            onClick={addRow}
                            className="rounded-md border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-amber-400 hover:text-amber-700"
                        >
                            Add Dependency
                        </button>
                    </div>

                    <div className="space-y-3">
                        {rows.map((row, index) => (
                            <div key={index} className="grid gap-3 sm:grid-cols-[1fr_160px_auto]">
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(event) => updateRow(index, { name: event.target.value })}
                                    placeholder="pandas"
                                    className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                />
                                <input
                                    type="text"
                                    value={row.version}
                                    onChange={(event) => updateRow(index, { version: event.target.value })}
                                    placeholder="optional"
                                    className="rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeRow(index)}
                                    disabled={index < 3 || (rows.length === 1 && !row.name && !row.version)}
                                    className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-500 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <input
                        type="checkbox"
                        checked={state.needsSpecialTorch}
                        onChange={(event) => dispatch({
                            type: "setNeedsSpecialTorch",
                            needsSpecialTorch: event.target.checked,
                        })}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span>
                        <span className="block text-sm font-semibold text-gray-800">
                            Special Torch Command
                        </span>
                        <span className="mt-1 block text-sm text-gray-600">
                            Activate this if the benchmark should use a separate command to install Torch.
                        </span>
                    </span>
                </label>

                {state.needsSpecialTorch ? (
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-800">special-torch.txt</span>
                        <textarea
                            value={state.specialTorchCommand}
                            onChange={(event) => dispatch({
                                type: "setSpecialTorchCommand",
                                specialTorchCommand: event.target.value,
                            })}
                            placeholder="pip install torch --index-url https://download.pytorch.org/whl/cu121"
                            rows={4}
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                        />
                    </label>
                ) : null}
            </div>

            <div className="space-y-4">
                <CodeBlock title="requirements.txt" language="txt" code={requirementsPreview} />
                <CodeBlock title="python-version.txt" language="txt" code={pythonPreview} />
                {state.needsSpecialTorch ? (
                    <CodeBlock title="special-torch.txt" language="txt" code={state.specialTorchCommand.trim()} />
                ) : null}
            </div>
        </div>
    );
}
