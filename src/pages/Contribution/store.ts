import { createContext, createElement, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import type {
    ContributorExperiment,
    ContributorResults,
    ContributorState,
} from "./types";

export type ContributionAction =
    | { type: "setToolName"; toolName: string }
    | { type: "setPythonVersion"; pythonVersion: string }
    | { type: "setRequirements"; requirements: string[] }
    | { type: "setNeedsSpecialTorch"; needsSpecialTorch: boolean }
    | { type: "setSpecialTorchCommand"; specialTorchCommand: string }
    | { type: "setExperiments"; experiments: ContributorExperiment[] }
    | { type: "setRunToolModelCode"; runToolModelCode: string }
    | { type: "setResults"; results: ContributorResults }
    | { type: "setWantsToContribute"; wantsToContribute: boolean | null }
    | { type: "setContributionType"; contributionType: "pr" | "issue" | null }
    | { type: "reset" };

export const initialContributionState: ContributorState = {
    toolName: "",
    pythonVersion: "",
    requirements: [],
    needsSpecialTorch: false,
    specialTorchCommand: "",
    experiments: [],
    runToolModelCode: "",
    results: { perDataset: [] },
    wantsToContribute: null,
    contributionType: null,
};

export function contributionReducer(
    state: ContributorState,
    action: ContributionAction,
): ContributorState {
    switch (action.type) {
        case "setToolName":
            return { ...state, toolName: action.toolName };
        case "setPythonVersion":
            return { ...state, pythonVersion: action.pythonVersion };
        case "setRequirements":
            return { ...state, requirements: action.requirements };
        case "setNeedsSpecialTorch":
            return { ...state, needsSpecialTorch: action.needsSpecialTorch };
        case "setSpecialTorchCommand":
            return { ...state, specialTorchCommand: action.specialTorchCommand };
        case "setExperiments":
            return { ...state, experiments: action.experiments };
        case "setRunToolModelCode":
            return { ...state, runToolModelCode: action.runToolModelCode };
        case "setResults":
            return { ...state, results: action.results };
        case "setWantsToContribute":
            return { ...state, wantsToContribute: action.wantsToContribute };
        case "setContributionType":
            return { ...state, contributionType: action.contributionType };
        case "reset":
            return initialContributionState;
        default:
            return state;
    }
}

interface ContributionContextValue {
    state: ContributorState;
    dispatch: Dispatch<ContributionAction>;
}

const ContributionContext = createContext<ContributionContextValue | null>(null);

interface ContributionProviderProps {
    children: ReactNode;
}

export function ContributionProvider({ children }: ContributionProviderProps) {
    const [state, dispatch] = useReducer(contributionReducer, initialContributionState);

    return createElement(
        ContributionContext.Provider,
        { value: { state, dispatch } },
        children,
    );
}

export function useContribution() {
    const context = useContext(ContributionContext);

    if (context === null) {
        throw new Error("useContribution must be used within a ContributionProvider");
    }

    return context;
}
