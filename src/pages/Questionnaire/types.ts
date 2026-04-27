export const ColumnType = {
    Categorical: "Categorical",
    Numerical: "Numerical",
    Temporal: "Temporal",
    Text: "Text",
    Mixed: "Mixed",
} as const;

export type ColumnType = (typeof ColumnType)[keyof typeof ColumnType];

export type TableCount = "none" | "two" | "more";

export type HardwareLevel = "worse" | "equivalent" | "better";

export type RuntimeLevel = "fast" | "moderate" | "slow";

export const Purpose = {
    DataAugmentation: "DataAugmentation",
    DatasetBalancing: "DatasetBalancing",
    MissingValueImputation: "MissingValueImputation",
    CustomizedGeneration: "CustomizedGeneration",
    PrivacyPreservation: "PrivacyPreservation",
} as const;

export type Purpose = (typeof Purpose)[keyof typeof Purpose];

export interface QuestionnaireState {
    selectedColumnTypes: ColumnType[];
    tableCount: TableCount;
    purposeMode: "single" | "multi";
    singlePurpose: Purpose | null;
    coinBudget: Record<Purpose, number>; //multi purpose
    cpuLevel: HardwareLevel;
    memoryLevel: HardwareLevel;
    gpuLevel: HardwareLevel;
    runtimeLevel: RuntimeLevel;
}

export interface VectorResults {
    R_dataset: number[];
    B_purpose: number[];
    R_hardware: number[];
    St: number[];
    topTools: { name: string; score: number }[];
}
