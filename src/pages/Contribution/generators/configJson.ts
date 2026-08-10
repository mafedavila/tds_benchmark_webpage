import type { ContributorExperiment, ContributorState } from "../types";

export function buildConfigExperiments(state: ContributorState): ContributorExperiment[] {
    const toolname = state.toolName.trim();

    return state.experiments.map((experiment) => ({
        ...experiment,
        toolname: toolname || experiment.toolname,
    }));
}

export function generateConfigJson(state: ContributorState): string {
    return JSON.stringify(buildConfigExperiments(state), null, 2);
}
