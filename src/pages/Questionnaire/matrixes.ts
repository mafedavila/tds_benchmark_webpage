// Rows: Categorical, Numerical, Temporal, Text, Mixed Cat/Num, 2 Tables, N Tables.
// Columns:AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REaLTabFormer, SMOTE, TabDDPM, TabSyn, TabuLaMiddle, TVAE
export const M_assess: number[][] = [
    // Categorical
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Numerical
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Temporal
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    // Text
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0],
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
// Column Metrics: AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REalTabFormer, SMOTE, TabDDPM, TabSyn, TabuLaMiddle, TVAE
export const M_bench: number[][] = [
    [3.83, 6.90, 7.43, 10.37, 8.58, 3.60, 1.27, 7.82, 6.15, 2.07, 8.17],
    [4.21, 6.57, 8.36, 10.29, 9.18, 3.46, 4.39, 9.75, 6.86, 6.79, 6.46],
    [2.97, 6.52, 8.77, 0, 6.67, 4.75, 1.20, 7.23, 0, 2.50, 4.42],
    [4.37, 3.43, 5.17, 0, 4.72, 7.67, 5.70, 3.70, 7.30, 7.47, 5.73],
    [3.61, 6.73, 9.05, 10.54, 9.15, 3.67, 5.34, 6.21, 5.52, 2.83, 3.34],
    [6.27, 7.82, 5.35, 7.11, 7.12, 9.02, 5.53, 5.27, 6.58, 6.42, 10.92],
];

// Rows: mean CPU, mean memory, mean GPU, runtime.
// Column Metrics: AutoDiff, CTABGAN+, CTGAN, GANBLR++, GReaT, REalTabFormer, SMOTE, TabDDPM, TabSyn, TabuLaMiddle, TVAE
export const M_comp: number[][] = [
    [5.47, 7.87, 4.60, 11.33, 2.07, 3.07, 10.53, 3.87, 6.93, 10.60, 4.33],
    [3.33, 6.33, 1.87, 4.47, 2.00, 10.67, 6.27, 9.00, 9.00, 12.40, 6.13],
    [5.20, 10.33, 10.00, 2.63, 12.47, 9.33, 2.63, 7.80, 6.33, 12.53, 6.47],
    [11.07, 6.73, 4.93, 10.00, 11.93, 13.00, 2.67, 5.67, 3.40, 8.13, 4.13],
];