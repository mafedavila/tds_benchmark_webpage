import { PURPOSES } from "../../calculations";
import { useQuestionnaire } from "../../store";
import { Purpose } from "../../types";
import CoinBudget from "../ui/CoinBudget";

const PURPOSE_OPTIONS = [
    {
        id: Purpose.DataAugmentation,
        label: "Data augmentation",
        description: "Increase dataset size",
    },
    {
        id: Purpose.DatasetBalancing,
        label: "Dataset balancing",
        description: "Fix class imbalance",
    },
    {
        id: Purpose.MissingValueImputation,
        label: "Missing value imputation",
        description: "Fill in missing data",
    },
    {
        id: Purpose.CustomizedGeneration,
        label: "Customized generation",
        description: "Generate with specific conditions",
    },
    {
        id: Purpose.PrivacyPreservation,
        label: "Privacy preservation",
        description: "Anonymize sensitive data",
    },
];

export default function PurposeSection() {
    const { state, dispatch } = useQuestionnaire();

    const setPurposeMode = (purposeMode: "single" | "multi") => {
        dispatch({ type: "setPurposeMode", purposeMode });
    };

    const setCoinBudget = (budget: Record<string, number>) => {
        const coinBudget = PURPOSES.reduce<Record<Purpose, number>>((acc, purpose) => {
            acc[purpose] = budget[purpose] ?? 0;

            return acc;
        }, {} as Record<Purpose, number>);

        dispatch({ type: "setCoinBudget", coinBudget });
    };

    return (
        <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Purpose</h2>
                <p className="text-sm text-gray-600">Choose whether this task has one objective or weighted priorities.</p>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">Purpose mode</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50">
                        <input
                            type="radio"
                            name="purpose-mode"
                            checked={state.purposeMode === "single"}
                            onChange={() => setPurposeMode("single")}
                            className="h-4 w-4 accent-amber-500"
                        />
                        <span>Single-Purpose</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50">
                        <input
                            type="radio"
                            name="purpose-mode"
                            checked={state.purposeMode === "multi"}
                            onChange={() => setPurposeMode("multi")}
                            className="h-4 w-4 accent-amber-500"
                        />
                        <span>Multi-Purpose</span>
                    </label>
                </div>
            </div>

            {state.purposeMode === "single" ? (
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-900">Select one purpose</h3>
                    <div className="grid gap-2 lg:grid-cols-2">
                        {PURPOSE_OPTIONS.map((option) => (
                            <label
                                key={option.id}
                                className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700 transition hover:bg-gray-50"
                            >
                                <input
                                    type="radio"
                                    name="single-purpose"
                                    checked={state.singlePurpose === option.id}
                                    onChange={() =>
                                        dispatch({ type: "setSinglePurpose", singlePurpose: option.id })
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
                </div>
            ) : (
                <CoinBudget options={PURPOSE_OPTIONS} budget={state.coinBudget} onChange={setCoinBudget} />
            )}

        </section>
    );
}
