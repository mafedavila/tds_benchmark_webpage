import {
    ColumnType,
    Purpose,
    type HardwareLevel,
    type QuestionnaireState,
    type RuntimeLevel,
    type TableCount,
    type VectorResults,
} from "./types";

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

// Rows: Categorical, Numerical, Temporal, Text, Mixed Cat/Num, 2 Tables, N Tables.
// Columns:AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REaLTabFormer, SMOTE, TVAE, TabDDPM, TabSyn, TabuLaMiddle

export const M_assess: number[][] = [
    // Categorical
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Numerical
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Temporal
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    // Text
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    // Mixed Cat/Num
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
    // 2 Tables
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    // N Tables
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

];

// Rows: Data Augmentation, Dataset Balancing, Missing Value Imputation, Customized Generation, Privacy Preservation.
// Columns: Marginal Distribution, Dependency Structure, Robustness, Privacy, Utility.
export const M_eval: number[][] = [
    [0.25, 0.25, 0.30, 0.15, 0.05],
    [0.35, 0.30, 0.15, 0.15, 0.05],
    [0.30, 0.35, 0.15, 0.15, 0.05],
    [0.15, 0.25, 0.30, 0.15, 0.15],
    [0.10, 0.10, 0.10, 0.10, 0.60],
];

// Rows: Marginal Distribution, Dependency Structure, Robustness, Privacy, Utility, Computational Performance.
// Column Metrics: AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REalTabFormer, SMOTE, TVAE, TabDDPM, TabSyn, TabuLaMiddle
export const M_bench: number[][] = [
    [3.83, 6.90, 7.43, 10.37, 8.58, 3.60, 1.27, 7.82, 6.15, 2.07, 8.17],
    [4.21, 6.57, 8.36, 10.29, 9.18, 3.46, 4.39, 9.75, 6.86, 6.79, 6.46],
    [2.97, 6.52, 8.77, 0, 6.67, 4.75, 1.20, 7.23, 0, 2.50, 4.42],
    [4.37, 3.43, 5.17, 0, 4.72, 7.67, 5.70, 3.70, 7.30, 7.47, 5.73],
    [3.61, 6.73, 9.05, 10.54, 9.15, 3.67, 5.34, 6.21, 5.52, 2.83, 3.34],
    [6.27, 7.82, 5.35, 7.11, 7.12, 9.02, 5.53, 5.27, 6.58, 6.42, 10.92],
];

// Rows: mean CPU, mean memory, mean GPU, runtime.
// Column Metrics: AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REalTabFormer, SMOTE, TVAE, TabDDPM, TabSyn, TabuLaMiddle
export const M_comp: number[][] = [
    [5.47, 7.87, 4.60, 11.33, 2.07, 3.07, 10.53, 3.87, 6.93, 10.60, 4.33],
    [3.33, 6.33, 1.87, 4.47, 2.00, 10.67, 6.27, 9.00, 9.00, 12.40, 6.13],
    [5.20, 10.33, 10.00, 2.63, 12.47, 9.33, 2.63, 7.80, 6.33, 12.53, 6.47],
    [11.07, 6.73, 4.93, 10.00, 11.93, 13.00, 2.67, 5.67, 3.40, 8.13, 4.13],
];

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

        return Dt === r_j ? 1 : 0;
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
