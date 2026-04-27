import { useQuestionnaire } from "../../store";
import type { RuntimeLevel } from "../../types";

const RUNTIME_OPTIONS: { value: RuntimeLevel; label: string; description: string }[] = [
    { value: "fast", label: "Fast", description: "< 0.25h" },
    { value: "moderate", label: "Moderate", description: "0.25-1h" },
    { value: "slow", label: "Slow", description: "> 1h" },
];

export default function RuntimeSection() {
    const { state, dispatch } = useQuestionnaire();

    return (
        <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Runtime</h2>
                <p className="text-sm text-gray-600">Select the runtime profile that best matches your constraints.</p>
            </div>

            <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-gray-900">Expected runtime</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                    {RUNTIME_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50"
                        >
                            <input
                                type="radio"
                                name="runtime-level"
                                checked={state.runtimeLevel === option.value}
                                onChange={() =>
                                    dispatch({ type: "setRuntimeLevel", runtimeLevel: option.value })
                                }
                                className="mt-1 h-4 w-4 accent-amber-500"
                            />
                            <span>
                                <span className="block font-medium text-gray-900">{option.label}</span>
                                <span className="block text-gray-500">{option.description}</span>
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>
        </section>
    );
}
