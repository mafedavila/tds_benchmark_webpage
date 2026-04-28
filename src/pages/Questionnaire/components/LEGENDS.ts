export const DATASET_LEGEND = [
    "Categorical",
    "Numerical",
    "Temporal",
    "Text",
    "Mixed Cat/Num",
    "2 Tables",
    "N Tables",
];

export const PURPOSE_LEGEND = [
    "Data Augmentation",
    "Dataset Balancing",
    "Missing Value Imputation",
    "Customized Generation",
    "Privacy Preservation",
];

// Labels para columnas (tools) — ya tienes TOOLS
// Labels para filas de cada matriz
export const M_ASSESS_ROW_LABELS = DATASET_LEGEND;        // 7 filas
export const M_EVAL_ROW_LABELS = PURPOSE_LEGEND;          // 5 filas  
export const M_BENCH_ROW_LABELS = [
    "Marginal Distribution",
    "Dependency Structure",
    "Robustness",
    "Privacy Preservation",
    "Utility",
    "Computational Performance",
];
 


export const HARDWARE_LEGEND = ["CPU", "Memory", "GPU", "Runtime"];

export const M_COMP_ROW_LABELS = HARDWARE_LEGEND;  

export const TOOL_LEGEND = [
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
];