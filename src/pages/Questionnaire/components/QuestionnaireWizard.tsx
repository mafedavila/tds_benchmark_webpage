import { useEffect, useMemo, useState, type FC } from "react";
import {
    TOOLS,
    computeAllVectors,
    computeBPurpose,
    computeRDataset,
    computeRHardware,
} from "../calculations";
import { useQuestionnaire } from "../store";
import type { QuestionnaireState } from "../types";
import DatasetSection from "./sections/DatasetSection";
import HardwareSection from "./sections/HardwareSection";
import PurposeSection from "./sections/PurposeSection";
import RuntimeSection from "./sections/RuntimeSection";
import VectorDisplay from "./ui/VectorDisplay";
import { Layout } from "../../Layout";

interface Step {
    id: "dataset" | "purpose" | "hardware" | "results";
    title: string;
    subtitle: string;
    component: FC;
    getVectors: (state: QuestionnaireState) => { label: string; vector: number[]; legend: string[] }[];
    isComplete: (state: QuestionnaireState) => boolean;
}

const DATASET_LEGEND = [
    "Categorical",
    "Numerical",
    "Temporal",
    "Text",
    "Mixed Cat/Num",
    "2 Tables",
    "N Tables",
];

const PURPOSE_LEGEND = [
    "Data Augmentation",
    "Dataset Balancing",
    "Missing Value Imputation",
    "Customized Generation",
    "Privacy Preservation",
];

const HARDWARE_LEGEND = ["CPU", "Memory", "GPU", "Runtime"];

const HardwareStep = () => (
    <div className="space-y-6">
        <HardwareSection />
        <RuntimeSection />
    </div>
);

const ResultsStep = () => {
    const { state } = useQuestionnaire();
    const vectors = useMemo(() => computeAllVectors(state), [state]);

    return (
        <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Recommended tools</h2>
                <p className="text-sm text-gray-600">
                    Scores are ranked from the vectors produced by your answers.
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {vectors.topTools.slice(0, 3).map((tool, index) => (
                    <div key={tool.name} className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                            Rank {index + 1}
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-gray-900">{tool.name}</h3>
                        <p className="mt-2 text-sm font-semibold text-gray-600">
                            {tool.score.toFixed(1)}% match
                        </p>
                    </div>
                ))}
            </div>

            <VectorDisplay
                R_dataset={vectors.R_dataset}
                B_purpose={vectors.B_purpose}
                R_hardware={vectors.R_hardware}
                showSt
                St={vectors.St}
                tools={[...TOOLS]}
            />
        </section>
    );
};

const STEPS: Step[] = [
    {
        id: "dataset",
        title: "About your dataset",
        subtitle: "Tell us which data structures your synthetic dataset needs.",
        component: DatasetSection,
        getVectors: (state) => [
            {
                label: "R_dataset",
                vector: computeRDataset(state.selectedColumnTypes, state.tableCount),
                legend: DATASET_LEGEND,
            },
        ],
        isComplete: (state) => state.selectedColumnTypes.length > 0,
    },
    {
        id: "purpose",
        title: "Application purpose",
        subtitle: "Choose one objective or distribute priorities across multiple goals.",
        component: PurposeSection,
        getVectors: (state) => [
            {
                label: "B_purpose",
                vector: computeBPurpose(state.purposeMode, state.singlePurpose, state.coinBudget),
                legend: PURPOSE_LEGEND,
            },
        ],
        isComplete: (state) => {
            if (state.purposeMode === "single") {
                return state.singlePurpose !== null;
            }

            return Object.values(state.coinBudget).reduce((sum, value) => sum + value, 0) === 10;
        },
    },
    {
        id: "hardware",
        title: "Your hardware",
        subtitle: "Compare your hardware and runtime needs against the benchmark reference.",
        component: HardwareStep,
        getVectors: (state) => [
            {
                label: "R_hardware",
                vector: computeRHardware(
                    state.cpuLevel,
                    state.memoryLevel,
                    state.gpuLevel,
                    state.runtimeLevel,
                ),
                legend: HARDWARE_LEGEND,
            },
        ],
        isComplete: (state) =>
            Boolean(state.cpuLevel && state.memoryLevel && state.gpuLevel && state.runtimeLevel),
    },
    {
        id: "results",
        title: "Recommended tools",
        subtitle: "Review the ranked tools and the final score vector.",
        component: ResultsStep,
        getVectors: (state) => {
            const vectors = computeAllVectors(state);

            return [
                { label: "R_dataset", vector: vectors.R_dataset, legend: DATASET_LEGEND },
                { label: "B_purpose", vector: vectors.B_purpose, legend: PURPOSE_LEGEND },
                { label: "R_hardware", vector: vectors.R_hardware, legend: HARDWARE_LEGEND },
                { label: "St", vector: vectors.St, legend: [...TOOLS] },
            ];
        },
        isComplete: () => true,
    },
];

const getPillClassName = (value: number) => {
    if (value === 0) {
        return "border-gray-200 bg-gray-100 text-gray-500";
    }

    if (value >= 1) {
        return "border-amber-400 bg-amber-500 text-amber-950";
    }

    if (value >= 0.75) {
        return "border-amber-300 bg-amber-500/80 text-amber-950";
    }

    if (value >= 0.5) {
        return "border-amber-300 bg-amber-500/60 text-amber-950";
    }

    if (value >= 0.25) {
        return "border-amber-200 bg-amber-500/40 text-amber-900";
    }

    return "border-amber-100 bg-amber-500/20 text-amber-800";
};

const formatValue = (value: number) => {
    if (Number.isInteger(value)) {
        return value.toString();
    }

    return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
};

function VectorStrip({ vectors }: { vectors: ReturnType<Step["getVectors"]> }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-900">Your vector so far</p>
            <div className="mt-3 space-y-3">
                {vectors.map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <span className="w-28 shrink-0 text-xs font-semibold text-gray-500">
                            {item.label}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {item.vector.map((value, index) => (
                                <span
                                    key={`${item.label}-${index}`}
                                    title={item.legend[index] ?? `Position ${index}`}
                                    className={`rounded-full border px-2 py-1 text-xs font-semibold tabular-nums transition-colors duration-200 ${getPillClassName(
                                        value,
                                    )}`}
                                >
                                    {formatValue(value)}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function QuestionnaireWizard() {
    const { state, dispatch } = useQuestionnaire();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const vectors = useMemo(() => computeAllVectors(state), [state]);
    const step = STEPS[currentStep] ?? STEPS[0];
    const StepComponent = step.component;
    const stepVectors = useMemo(() => step.getVectors(state), [state, step]);
    const isCurrentStepComplete = step.isComplete(state);

    useEffect(() => {
        console.log("Questionnaire vectors", computeAllVectors(state));
    }, [state]);

    const goBack = () => {
        setDirection("back");
        setCurrentStep((stepIndex) => Math.max(stepIndex - 1, 0));
    };

    const goForward = () => {
        setDirection("forward");
        setCurrentStep((stepIndex) => Math.min(stepIndex + 1, STEPS.length - 1));
    };

    const startOver = () => {
        setDirection("back");
        dispatch({ type: "reset" });
        setCurrentStep(0);
    };

    return (
        <Layout>
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <style>
                {`
                    @keyframes slideInFromRight {
                        from { opacity: 0; transform: translateX(2rem); }
                        to { opacity: 1; transform: translateX(0); }
                    }

                    @keyframes slideInFromLeft {
                        from { opacity: 0; transform: translateX(-2rem); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                `}
            </style>

            <div className="mb-6 grid grid-cols-4 gap-2">
                {STEPS.map((progressStep, index) => {
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div key={progressStep.id} className="space-y-2">
                            <div
                                className={`h-2 rounded-full transition-colors ${
                                    isCompleted
                                        ? "bg-amber-500"
                                        : isCurrent
                                          ? "bg-amber-300"
                                          : "bg-gray-200"
                                }`}
                            />
                            <p
                                className={`text-center text-xs font-semibold ${
                                    isCurrent ? "text-amber-700" : "text-gray-500"
                                }`}
                            >
                                {progressStep.id === "dataset"
                                    ? "Dataset"
                                    : progressStep.id === "purpose"
                                      ? "Purpose"
                                      : progressStep.id === "hardware"
                                        ? "Hardware"
                                        : "Results"}
                            </p>
                        </div>
                    );
                })}
            </div>

            <section className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-3 shadow-sm sm:p-5">
                <div className="mb-5 px-1">
                    <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{step.subtitle}</p>
                </div>

                <div
                    key={currentStep}
                    className={
                        direction === "forward"
                            ? "animate-[slideInFromRight_350ms_ease-out]"
                            : "animate-[slideInFromLeft_350ms_ease-out]"
                    }
                >
                    <StepComponent />
                </div>

                {step.id !== "results" && (
                    <div className="mt-5">
                        <VectorStrip vectors={stepVectors} />
                    </div>
                )}

                <div className="mt-5 flex items-center justify-between gap-3">
                    {step.id === "results" ? (
                        <button
                            type="button"
                            onClick={startOver}
                            className="ml-auto rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400"
                        >
                            Start over
                        </button>
                    ) : (
                        <>
                            {currentStep > 0 ? (
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="text-sm font-semibold text-gray-600 transition hover:text-gray-900"
                                >
                                    Back
                                </button>
                            ) : (
                                <span />
                            )}

                            <button
                                type="button"
                                onClick={goForward}
                                disabled={!isCurrentStepComplete}
                                className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                            >
                                {currentStep === 2 ? "See results" : "Continue"}
                            </button>
                        </>
                    )}
                </div>
            </section>

            <span className="sr-only" aria-live="polite">
                Current top score: {formatValue(Math.max(...vectors.St, 0))}
            </span>
        </main>
        </Layout>
    );
}
