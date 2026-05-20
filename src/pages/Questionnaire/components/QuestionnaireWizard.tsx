import { memo, useCallback, useMemo, useState, type FC } from "react";
import {
    TOOLS,
    computeAllVectors,
    computeBPurpose,
    computeRDataset,
    computeRHardware,
    computeWDataset,
    computeWPurpose,
    computeWHardware,
} from "../calculations";
import { getToolDownloadHref } from "../tools";
import { M_assess, M_eval, M_bench, M_comp } from "../matrixes";
import {
    DATASET_LEGEND,
    PURPOSE_LEGEND,
    HARDWARE_LEGEND,
    TOOL_LEGEND,
    M_ASSESS_ROW_LABELS,
    M_EVAL_ROW_LABELS,
    M_COMP_ROW_LABELS,
    M_BENCH_ROW_LABELS,
} from "./LEGENDS";

import { useQuestionnaire } from "../store";
import type { QuestionnaireState, VectorResults } from "../types";
import DatasetSection from "./sections/DatasetSection";
import HardwareSection from "./sections/HardwareSection";
import PurposeSection from "./sections/PurposeSection";
import RuntimeSection from "./sections/RuntimeSection";
import VectorDisplay from "./ui/VectorDisplay";
import { Layout } from "../../Layout";
import MatrixDisplay from "./ui/Matrix";
import VectorPills from "./ui/VectorPills";
import { formatValue, type ColorMode } from "./ui/vectorStyles";

interface MatrixInfo {
    label?: string;
    rowLabels: string[];
    colLabels: string[];
    matrix: number[][];
}

interface VectorViewModel {
    label: string;
    vector: number[];
    legend: string[];
    colorMode?: ColorMode;
    matrixInfo?: MatrixInfo;
    /** When true, renders the tool name below each numeric value in the pills. */
    showLabels?: boolean;
}

type StepId = "dataset" | "purpose" | "hardware" | "results";

interface Step {
    id: StepId;
    title: string;
    subtitle: string;
    shortLabel: string;
    component: FC<{ vectors: VectorResults }>;
    getVectors: (state: QuestionnaireState, vectors: VectorResults) => VectorViewModel[];
    isComplete: (state: QuestionnaireState) => boolean;
}

const HardwareStep = () => (
    <div className="space-y-6">
        <HardwareSection />
        <RuntimeSection />
    </div>
);

const ResultsStep = ({ vectors }: { vectors: VectorResults }) => (
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
                    <a
                        href={getToolDownloadHref(tool.urlDownload)}
                        download
                        className="mt-4 inline-block rounded-lg bg-[#3A7F8F] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2f6a78]"
                    >
                        Download tool
                    </a>
                </div>
            ))}
        </div>

        <VectorDisplay
            w_dataset={vectors.w_dataset}
            w_purpose={vectors.w_purpose}
            w_hardware={vectors.w_hardware}
            showSt
            St={vectors.St}
            tools={TOOLS}
        />
    </section>
);

const STEPS: readonly Step[] = [
    {
        id: "dataset",
        title: "About your dataset",
        subtitle: "Tell us which data structures your synthetic dataset needs.",
        shortLabel: "Dataset",
        component: DatasetSection,
        getVectors: (state) => {
            const R_dataset = computeRDataset(state.selectedColumnTypes, state.tableCount);
            const w_dataset = computeWDataset(R_dataset);

            return [
                { label: "R_dataset", vector: R_dataset, legend: DATASET_LEGEND },
                {
                    label: "w_dataset",
                    vector: w_dataset,
                    legend: TOOL_LEGEND,
                    colorMode: "dataset-compatibility",
                    showLabels: true,
                    matrixInfo: {
                        label: "M_assess",
                        rowLabels: M_ASSESS_ROW_LABELS,
                        colLabels: [...TOOLS],
                        matrix: M_assess,
                    },
                },
            ];
        },
        isComplete: (state) => state.selectedColumnTypes.length > 0 && state.tableCount !== "more",
    },
    {
        id: "purpose",
        title: "Application purpose",
        subtitle: "Choose one objective or distribute priorities across multiple goals.",
        shortLabel: "Purpose",
        component: PurposeSection,
        getVectors: (state) => {
            const B_purpose = computeBPurpose(state.purposeMode, state.singlePurpose, state.coinBudget);
            const w_purpose = computeWPurpose(B_purpose);

            return [
                {
                    label: "B_purpose",
                    vector: B_purpose,
                    legend: PURPOSE_LEGEND,
                    matrixInfo: {
                        label: "M_eval",
                        rowLabels: M_EVAL_ROW_LABELS,
                        colLabels: ["Marginal Dist.", "Dependency", "Utility", "Robustness", "Privacy"],
                        matrix: M_eval,
                    },
                },
                {
                    label: "w_purpose",
                    vector: w_purpose,
                    legend: TOOL_LEGEND,
                    colorMode: "inverse_ranked",
                    showLabels: true,
                    matrixInfo: {
                        label: "M_bench",
                        rowLabels: M_BENCH_ROW_LABELS,
                        colLabels: [...TOOLS],
                        matrix: M_bench,
                    },
                },
            ];
        },
        isComplete: (state) => {
            if (state.purposeMode === "single") return state.singlePurpose !== null;
            return Object.values(state.coinBudget).reduce((sum, value) => sum + value, 0) === 10;
        },
    },
    {
        id: "hardware",
        title: "Your hardware",
        subtitle: "Compare your hardware and runtime needs against the benchmark reference.",
        shortLabel: "Hardware",
        component: HardwareStep,
        getVectors: (state) => {
            const R_hardware = computeRHardware(
                state.cpuLevel,
                state.memoryLevel,
                state.gpuLevel,
                state.runtimeLevel,
            );
            const w_hardware = computeWHardware(R_hardware);

            return [
                { label: "R_hardware", vector: R_hardware, legend: HARDWARE_LEGEND },
                {
                    label: "w_hardware",
                    vector: w_hardware,
                    legend: TOOL_LEGEND,
                    colorMode: "inverse_ranked",
                    showLabels: true,
                    matrixInfo: {
                        label: "M_comp",
                        rowLabels: M_COMP_ROW_LABELS,
                        colLabels: [...TOOLS],
                        matrix: M_comp,
                    },
                },
            ];
        },
        isComplete: (state) =>
            Boolean(state.cpuLevel && state.memoryLevel && state.gpuLevel && state.runtimeLevel),
    },
    {
        id: "results",
        title: "Recommended tools",
        subtitle: "Review the ranked tools and the final score vector.",
        shortLabel: "Results",
        component: ResultsStep,
        getVectors: (_state, vectors) => [
            {
                label: "w_dataset",
                vector: vectors.w_dataset,
                legend: TOOL_LEGEND,
                colorMode: "dataset-compatibility",
                showLabels: true,
            },
            {
                label: "w_purpose",
                vector: vectors.w_purpose,
                legend: TOOL_LEGEND,
                colorMode: "inverse_ranked",
                showLabels: true,
            },
            {
                label: "w_hardware",
                vector: vectors.w_hardware,
                legend: TOOL_LEGEND,
                colorMode: "inverse_ranked",
                showLabels: true,
            },
            { label: "St", vector: vectors.St, legend: TOOL_LEGEND, colorMode: "ranked", showLabels: true },
        ],
        isComplete: () => true,
    },
] as const;

const LABEL_CLASS = "w-28 shrink-0 text-xs font-semibold text-gray-500";

const VectorRow = memo(function VectorRow({ item }: { item: VectorViewModel }) {
    return (
        <>
            <span className={LABEL_CLASS}>{item.label}</span>
            <VectorPills
                idPrefix={item.label}
                values={item.vector}
                labels={item.legend}
                colorMode={item.colorMode}
                showLabels={item.showLabels}
            />
        </>
    );
});

const VectorEntry = memo(function VectorEntry({ item }: { item: VectorViewModel }) {
    const matrix = item.matrixInfo;
    const isPurposeWithMatrix = item.label === "w_purpose" && Boolean(matrix);

    if (isPurposeWithMatrix && matrix) {
        return (
            <div>
                <div className="flex flex-wrap gap-1.5">
                    <MatrixDisplay
                        label={matrix.label ?? item.label}
                        rowLabels={matrix.rowLabels}
                        colLabels={matrix.colLabels}
                        matrix={matrix.matrix}
                    />
                    <div className="flex flex-row items-center pl-3 pt-3">
                        <VectorRow item={item} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <VectorRow item={item} />
            </div>
            {matrix && (
                <MatrixDisplay
                    label={matrix.label ?? item.label}
                    rowLabels={matrix.rowLabels}
                    colLabels={matrix.colLabels}
                    matrix={matrix.matrix}
                />
            )}
        </div>
    );
});

function VectorStrip({ vectors }: { vectors: VectorViewModel[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 transition hover:text-gray-600"
                    aria-expanded={open}
                >
                    <svg
                        className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                    {open ? "Hide" : "More information"}
                </button>
            </div>
            {open && (
                <div className="mt-3 space-y-4">
                    <p className="text-sm font-semibold text-gray-900">Your vectors so far</p>
                    {vectors.map((item) => (
                        <VectorEntry key={item.label} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

const ResearchGapNotice = () => (
    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
        <svg
            className="mt-0.5 h-5 w-5 shrink-0 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
        </svg>
        <div>
            <p className="text-sm font-bold text-red-700">Research Gap</p>
            <p className="mt-0.5 text-sm text-red-600">
                Simultaneous generation of more than 2 tables is currently an open research problem.
                None of the available tools support this configuration. Please select "Single table" or
                "Two tables" to continue.
            </p>
        </div>
    </div>
);

const StepProgress = ({ currentStep }: { currentStep: number }) => (
    <div className="mb-6 grid grid-cols-4 gap-2">
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
                    <p
                        className={`text-center text-xs font-semibold ${isCurrent ? "text-amber-700" : "text-gray-500"
                            }`}
                    >
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

export default function QuestionnaireWizard() {
    const { state, dispatch } = useQuestionnaire();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<"forward" | "back">("forward");

    const vectors = useMemo(() => computeAllVectors(state), [state]);
    const step = STEPS[currentStep] ?? STEPS[0];
    const stepVectors = useMemo(() => step.getVectors(state, vectors), [state, step, vectors]);
    const isCurrentStepComplete = step.isComplete(state);
    const StepComponent = step.component;

    const goBack = useCallback(() => {
        setDirection("back");
        setCurrentStep((index) => Math.max(index - 1, 0));
    }, []);

    const goForward = useCallback(() => {
        setDirection("forward");
        setCurrentStep((index) => Math.min(index + 1, STEPS.length - 1));
    }, []);

    const startOver = useCallback(() => {
        setDirection("back");
        dispatch({ type: "reset" });
        setCurrentStep(0);
    }, [dispatch]);

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
                        key={currentStep}
                        className={
                            direction === "forward"
                                ? "animate-[slideInFromRight_350ms_ease-out]"
                                : "animate-[slideInFromLeft_350ms_ease-out]"
                        }
                    >
                        <StepComponent vectors={vectors} />
                    </div>

                    {step.id === "dataset" && state.tableCount === "more" && <ResearchGapNotice />}

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
                                    {step.id === "hardware" ? "See results" : "Continue"}
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
