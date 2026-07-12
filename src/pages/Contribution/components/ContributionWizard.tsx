import { useCallback, useState, type FC } from "react";

import { Layout } from "../../Layout";
import { ConfigStep } from "./steps/ConfigStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { ToolNameStep } from "./steps/ToolNameStep";

type StepId = "tool" | "requirements" | "config" | "runtool" | "results" | "submission";

interface Step {
    id: StepId;
    title: string;
    subtitle: string;
    shortLabel: string;
    component: FC;
}

const ResultsStep = () => <div className="rounded-2xl bg-white p-6 text-gray-600">Results placeholder</div>;
const SubmissionStep = () => <div className="rounded-2xl bg-white p-6 text-gray-600">Contribution submission placeholder</div>;

const STEPS: readonly Step[] = [
    {
        id: "tool",
        title: "About your tool",
        subtitle: "Provide the information needed to reproduce your environment.",
        shortLabel: "Tool",
        component: ToolNameStep,
    },
    {
        id: "requirements",
        title: "Requirements",
        subtitle: "Declare the Python environment and dependencies needed by your tool.",
        shortLabel: "Requirements",
        component: RequirementsStep,
    },
    {
        id: "config",
        title: "Config",
        subtitle: "Select datasets and review the config.json generated for the benchmark.",
        shortLabel: "Config",
        component: ConfigStep,
    },
    {
        id: "runtool",
        title: "Run Tool",
        subtitle: "Provide the code needed to run your tool on the benchmark datasets.",
        shortLabel: "Run Tool",
        component: () => <div className="rounded-2xl bg-white p-6 text-gray-600">Run Tool placeholder</div>,
    },
    {
        id: "results",
        title: "Results",
        subtitle: "Report the benchmark results for each evaluated dataset.",
        shortLabel: "Results",
        component: ResultsStep,
    },
    {
        id: "submission",
        title: "Contribution",
        subtitle: "Choose how you would like to submit your benchmark contribution.",
        shortLabel: "Submit",
        component: SubmissionStep,
    },
] as const;

const StepProgress = ({ currentStep }: { currentStep: number }) => (
    <div className="mb-6 grid grid-cols-5 gap-2">
        {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
                <div key={step.id} className="space-y-2">
                    <div
                        className={`h-2 rounded-full transition-colors ${isCompleted
                            ? "bg-amber-500"
                            : isCurrent
                                ? "bg-amber-300"
                                : "bg-gray-200"
                            }`}
                    />
                    <p className={`text-center text-xs font-semibold ${isCurrent ? "text-amber-700" : "text-gray-500"}`}>
                        {step.shortLabel}
                    </p>
                </div>
            );
        })}
    </div>
);

const WIZARD_KEYFRAMES = `
    @keyframes slideInFromRight {
        from { opacity: 0; transform: translateX(2rem); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInFromLeft {
        from { opacity: 0; transform: translateX(-2rem); }
        to { opacity: 1; transform: translateX(0); }
    }
`;

export default function ContributionWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const step = STEPS[currentStep] ?? STEPS[0];
    const StepComponent = step.component;

    const goBack = useCallback(() => {
        setDirection("back");
        setCurrentStep((index) => Math.max(index - 1, 0));
    }, []);

    const goForward = useCallback(() => {
        setDirection("forward");
        setCurrentStep((index) => Math.min(index + 1, STEPS.length - 1));
    }, []);

    return (
        <Layout>
            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <style>{WIZARD_KEYFRAMES}</style>
                <StepProgress currentStep={currentStep} />

                <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-3 shadow-sm sm:p-5">
                    <div className="mb-5 px-1">
                        <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                        <p className="mt-1 text-sm text-gray-600">{step.subtitle}</p>
                    </div>

                    <div
                        key={step.id}
                        className={direction === "forward"
                            ? "animate-[slideInFromRight_350ms_ease-out]"
                            : "animate-[slideInFromLeft_350ms_ease-out]"}
                    >
                        <StepComponent />
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                        {currentStep > 0 ? (
                            <button
                                type="button"
                                onClick={goBack}
                                className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
                            >
                                Back
                            </button>
                        ) : <span />}

                        <button
                            type="button"
                            onClick={goForward}
                            disabled={currentStep === STEPS.length - 1}
                            className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                        >
                            Continue
                        </button>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
