export type ProblemType = "classification" | "regression";

export interface ColumnTypes {
  categorical: string[];
  continuous: string[];
  integer: string[];
  mixed: Record<string, number[]>; // columna -> valores especiales (ej. 0.0)
  log: string[];
  general: string[];
  non_categorical: string[];
}

export interface DatasetCatalogEntry {
  dataset: string;           // "adult"
  problem_type: ProblemType;
  target: string;
  columns: ColumnTypes;
}

export interface ContributorExperiment {
  toolname: string;
  dataset: string;
  problem_type: ProblemType;
  target: string;
  columns: ColumnTypes;
}

export interface ContributorState {
  toolName: string;
  pythonVersion: string;             // python-version.txt
  requirements: string[];            // requirements.txt (una dependencia por línea, con o sin versión)
  needsSpecialTorch: boolean;
  specialTorchCommand: string;       // contenido de special-torch.txt si aplica
  experiments: ContributorExperiment[]; // uno o más datasets contra los que se probó
  runToolModelCode: string;          // el bloque de código que el usuario pega dentro del skeleton de run_tool.py
  results: ContributorResults;
  wantsToContribute: boolean | null;
  contributionType: "pr" | "issue" | null;
}

export interface DimensionResult {
  // resultados agregados que el usuario escribe a mano, por dataset y dimensión
  dataset: string;
  marginalDistribution?: string;   // texto libre / número, ej. "Wasserstein avg: 0.032"
  dependency?: string;
  robustness?: string;
  privacy?: string;
  mlUtility?: string;
  runtime?: string;
  notes?: string;
}

export interface ContributorResults {
  perDataset: DimensionResult[];
}