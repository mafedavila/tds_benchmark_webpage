import type { ContributorState } from "../types";

export function generatePythonVersionTxt(state: ContributorState): string {
    return state.pythonVersion.trim();
}
