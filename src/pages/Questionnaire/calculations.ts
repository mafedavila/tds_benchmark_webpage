import {
    ColumnType,
    Purpose,
    type HardwareLevel,
    type QuestionnaireState,
    type RuntimeLevel,
    type TableCount,
    type VectorResults,
} from "./types";

import { M_assess, M_eval, M_bench, M_comp } from "./matrixes";

export const TOOLS = [
    "AutoDiff",
    "CTABGAN+",
    "CTGAN",
    "GANBLR++",
    "GReaT",
    "REaLTabFormer",
    "SMOTE",
    "TabDDPM",
    "TabSyn",
    "TabuLaMiddle",
    "TVAE",
] as const;

export type ToolName = (typeof TOOLS)[number];

export const PURPOSES = [
    Purpose.DataAugmentation,
    Purpose.DatasetBalancing,
    Purpose.MissingValueImputation,
    Purpose.CustomizedGeneration,
    Purpose.PrivacyPreservation,
] as const;


const LEVEL_WEIGHT: Record<HardwareLevel | RuntimeLevel, number> = {
    worse: 1.5,
    equivalent: 1,
    better: 0.5,
    fast: 1.5,
    moderate: 1,
    slow: 0.5,
};

function sum(vector: number[]): number {
    return vector.reduce((total, value) => total + value, 0);
}

function dotVectorMatrix(vector: number[], matrix: number[][]): number[] {
    return matrix[0].map((_, columnIndex) =>
        vector.reduce((total, value, rowIndex) => total + value * matrix[rowIndex][columnIndex], 0),
    );
}

export function computeRDataset(
    selectedColumnTypes: ColumnType[],
    tableCount: TableCount,
): number[] {
    return [
        selectedColumnTypes.includes(ColumnType.Categorical) ? 1 : 0,
        selectedColumnTypes.includes(ColumnType.Numerical) ? 1 : 0,
        selectedColumnTypes.includes(ColumnType.Temporal) ? 1 : 0,
        selectedColumnTypes.includes(ColumnType.Text) ? 1 : 0,
        selectedColumnTypes.includes(ColumnType.Mixed) ? 1 : 0,
        tableCount === "two" ? 1 : 0,
        tableCount === "more" ? 1 : 0,
    ];
}

export function computeWDataset(R_dataset: number[]): number[] {
    return dotVectorMatrix(R_dataset, M_assess);
}

export function computeBPurpose(
    purposeMode: QuestionnaireState["purposeMode"],
    singlePurpose: Purpose | null,
    coinBudget: Record<Purpose, number>,
): number[] {
    if (purposeMode === "single") {
        return PURPOSES.map((purpose) => (purpose === singlePurpose ? 1 : 0));
    }

    const rawBudget = PURPOSES.map((purpose) => coinBudget[purpose]);
    const totalCoins = sum(rawBudget);

    if (totalCoins === 0) {
        return rawBudget;
    }

    return rawBudget.map((coins) => coins / totalCoins);
}

export function computeWPurpose(B_purpose: number[]): number[] {
    const R_purpose = dotVectorMatrix(B_purpose, M_eval);
    const purposeBenchmarkRows = M_bench.slice(0, R_purpose.length);

    return dotVectorMatrix(R_purpose, purposeBenchmarkRows);
}

export function computeRHardware(
    cpuLevel: HardwareLevel,
    memoryLevel: HardwareLevel,
    gpuLevel: HardwareLevel,
    runtimeLevel: RuntimeLevel,
): number[] {
    return [
        LEVEL_WEIGHT[cpuLevel],
        LEVEL_WEIGHT[memoryLevel],
        LEVEL_WEIGHT[gpuLevel],
        LEVEL_WEIGHT[runtimeLevel],
    ];
}

export function computeWHardware(R_hardware: number[]): number[] {
    return dotVectorMatrix(R_hardware, M_comp);
}

export function computeFt(w_dataset: number[], R_dataset: number[]): number[] {
    const r_j = sum(R_dataset);

    return w_dataset.map((datasetWeight) => {
        const Dt = r_j - datasetWeight;

        return Dt === 0 ? 1 : 0;
    });
}

export function normalize(vector: number[]): number[] {
    const min = Math.min(...vector);
    const max = Math.max(...vector);

    if (max === min) {
        return vector.map(() => 0);
    }

    return vector.map((value) => (value - min) / (max - min));
}

export function computeSt(Ft: number[], w_purpose: number[], w_hardware: number[]): number[] {
    const P_normalized = normalize(w_purpose);
    const H_normalized = normalize(w_hardware);

    return Ft.map((filterValue, index) =>
        filterValue === 1 ? 100 * (1 - 0.5 * (P_normalized[index] + H_normalized[index])) : 0,
    );
}

export function computeAllVectors(state: QuestionnaireState): VectorResults {
    const R_dataset = computeRDataset(state.selectedColumnTypes, state.tableCount);
    const w_dataset = computeWDataset(R_dataset);
    const B_purpose = computeBPurpose(state.purposeMode, state.singlePurpose, state.coinBudget);
    const w_purpose = computeWPurpose(B_purpose);
    const R_hardware = computeRHardware(
        state.cpuLevel,
        state.memoryLevel,
        state.gpuLevel,
        state.runtimeLevel,
    );
    const w_hardware = computeWHardware(R_hardware);

    
    const Ft = computeFt(w_dataset, R_dataset);
    const St = computeSt(Ft, w_purpose, w_hardware);
    const topTools = TOOLS.map((name, index) => ({ name, score: St[index] }))
        .filter((tool) => tool.score > 0)
        .sort((left, right) => right.score - left.score);

    return {
        R_dataset,
        w_dataset,
        B_purpose,
        w_purpose,
        R_hardware,
        w_hardware,
        Ft,
        St,
        topTools,
    };
}

export default computeAllVectors;
