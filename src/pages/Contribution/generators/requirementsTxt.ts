import type { ContributorState } from "../types";

export function generateRequirementsTxt(state: ContributorState): string {
    return state.requirements
        .map((requirement) => requirement.trim())
        .filter(Boolean)
        .join("\n");
}
