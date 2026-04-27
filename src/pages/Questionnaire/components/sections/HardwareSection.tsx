import { useQuestionnaire } from "../../store";
import type { HardwareLevel } from "../../types";

const HARDWARE_OPTIONS: { value: HardwareLevel; label: string }[] = [
    { value: "worse", label: "Worse" },
    { value: "equivalent", label: "Equivalent" },
    { value: "better", label: "Better" },
];

export default function HardwareSection() {
    const { state, dispatch } = useQuestionnaire();

    return (
        <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Hardware</h2>
                <p className="text-sm text-gray-600">Compare your available hardware against the benchmark reference.</p>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
                <div className="bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">Reference hardware</div>
                <div className="grid gap-px bg-gray-200 text-sm sm:grid-cols-3">
                    <div className="bg-white p-3">
                        <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">CPU</span>
                        Intel Core i9-12900H
                    </div>
                    <div className="bg-white p-3">
                        <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">Memory</span>
                        32GB RAM
                    </div>
                    <div className="bg-white p-3">
                        <span className="block text-xs font-medium uppercase tracking-wide text-gray-500">GPU</span>
                        NVIDIA RTX 4090
                    </div>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <HardwareRadioGroup
                    label="CPU"
                    name="cpu-level"
                    value={state.cpuLevel}
                    onChange={(cpuLevel) => dispatch({ type: "setCpuLevel", cpuLevel })}
                />
                <HardwareRadioGroup
                    label="Memory"
                    name="memory-level"
                    value={state.memoryLevel}
                    onChange={(memoryLevel) => dispatch({ type: "setMemoryLevel", memoryLevel })}
                />
                <HardwareRadioGroup
                    label="GPU"
                    name="gpu-level"
                    value={state.gpuLevel}
                    onChange={(gpuLevel) => dispatch({ type: "setGpuLevel", gpuLevel })}
                />
            </div>
        </section>
    );
}

function HardwareRadioGroup({
    label,
    name,
    value,
    onChange,
}: {
    label: string;
    name: string;
    value: HardwareLevel;
    onChange: (value: HardwareLevel) => void;
}) {
    return (
        <fieldset className="space-y-2">
            <legend className="text-sm font-semibold text-gray-900">{label}</legend>
            <div className="space-y-2">
                {HARDWARE_OPTIONS.map((option) => (
                    <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                        <input
                            type="radio"
                            name={name}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            className="h-4 w-4 accent-amber-500"
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
