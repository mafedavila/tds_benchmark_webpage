import { CodeBlock } from "../CodeBlock";
import { generateRunToolPy } from "../../generators/runToolPy";
import { useContribution } from "../../store";

export function RunToolStep() {
    const { state, dispatch } = useContribution();
    const runToolPreview = generateRunToolPy(state);

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <label className="block">
                    <span className="text-sm font-semibold text-gray-800">train_model function</span>
                    <textarea
                        value={state.runToolModelCode}
                        onChange={(event) => dispatch({
                            type: "setRunToolModelCode",
                            runToolModelCode: event.target.value,
                        })}
                        placeholder={`def train_model(data):\n    # Train your model and return synthetic_data\n    return synthetic_data`}
                        rows={22}
                        spellCheck={false}
                        className="mt-2 min-h-[32rem] w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm leading-6 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                    />
                </label>
            </div>

            <div className="lg:sticky lg:top-6 lg:self-start">
                <CodeBlock title="run_tool.py" language="python" code={runToolPreview} />
            </div>
        </div>
    );
}
