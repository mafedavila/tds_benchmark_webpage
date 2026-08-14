import { useCallback, useState, type FC } from "react";

import { Layout } from "../../Layout";
import { ConfigStep } from "./steps/ConfigStep";
import { DownloadFolderStep } from "./steps/DownloadFolderStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { RunToolStep } from "./steps/RunToolStep";
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

const STEPS: readonly Step[] = [
    {
        id: "tool",
        title: "About your tool",
        subtitle: "Welcome! To keep this benchmark relevant and up to date, we greatly appreciate contributions of new Tabular Data Synthesis tools. The following questionnaire will guide you through the process of adding your tool to the benchmark. You will be asked to provide some basic information about the tool, its requirements, and the types of data it supports. Based on your answers, the platform will help you run the benchmark locally and evaluate your tool under the same conditions as the existing tools. Once the evaluation is complete, you can review your results and decide whether you would like to contribute your tool to the public benchmark by creating a merge request. Thank you for helping us keep the benchmark open, relevant, and continuously evolving.",
        shortLabel: "Tool",
        component: ToolNameStep,
    },
    {
        id: "requirements",
        title: "Requirements",
        subtitle: "Now, please specify the Python version it requires (default is 3.9) and the packages required. If necessary, you can add the specific version of the package. At the end, copy the copy th requirements.txt and python- version.txt files. Also, if necessary, e special- torch.txt file.",
        shortLabel: "Requirements",
        component: RequirementsStep,
    },
    {
        id: "config",
        title: "Config",
        subtitle: "This step helps you create the experiment config file. You can add as many datasets from the original benchmark as you need. If needed, you can adjust the column types or remove columns",
        shortLabel: "Config",
        component: ConfigStep,
    },
    {
        id: "runtool",
        title: "Run Tool",
        subtitle: "This step provides you with a sample run_tool.py file using SMOTE example. You can use the panel on the left to adjust the train_model function according to your tool's need. Remember to import your model in the preamble.",
        shortLabel: "Run Tool",
        component: RunToolStep,
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
        title: "Download folder",
        subtitle: "Generate the tool folder expected by the benchmark repository.",
        shortLabel: "Download",
        component: DownloadFolderStep,
    },
] as const;

const StepProgress = ({ currentStep }: { currentStep: number }) => (
    <div className="mb-6 grid gap-2" style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}>
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
