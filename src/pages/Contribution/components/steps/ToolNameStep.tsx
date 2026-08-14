import { useContribution } from "../../store";


export function ToolNameStep() {
    const { state, dispatch } = useContribution();

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
                <label className="block">
                    <span className="text-sm font-semibold text-gray-800">First, give your tool a name</span>
                    <input
                        type="text"
                        value={state.toolName}
                        onChange={(event) => dispatch({ type: "setToolName", toolName: event.target.value })}
                        placeholder="ctgan, smote, tabddpm..."
                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>

            </div>
        </div>
    );
}
