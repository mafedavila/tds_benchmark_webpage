import { createContext, createElement, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import {
    Purpose,
    type ColumnType,
    type HardwareLevel,
    type QuestionnaireState,
    type RuntimeLevel,
    type TableCount,
} from "./types";

export type QuestionnaireAction =
    | { type: "setSelectedColumnTypes"; selectedColumnTypes: ColumnType[] }
    | { type: "setTableCount"; tableCount: TableCount }
    | { type: "setPurposeMode"; purposeMode: QuestionnaireState["purposeMode"] }
    | { type: "setSinglePurpose"; singlePurpose: Purpose | null }
    | { type: "setCoinBudget"; coinBudget: Record<Purpose, number> }
    | { type: "setCpuLevel"; cpuLevel: HardwareLevel }
    | { type: "setMemoryLevel"; memoryLevel: HardwareLevel }
    | { type: "setGpuLevel"; gpuLevel: HardwareLevel }
    | { type: "setRuntimeLevel"; runtimeLevel: RuntimeLevel }
    | { type: "reset" };

export const initialQuestionnaireState: QuestionnaireState = {
    selectedColumnTypes: [],
    tableCount: "none",
    purposeMode: "single",
    singlePurpose: null,
    coinBudget: {
        [Purpose.DataAugmentation]: 0,
        [Purpose.DatasetBalancing]: 0,
        [Purpose.MissingValueImputation]: 0,
        [Purpose.CustomizedGeneration]: 0,
        [Purpose.PrivacyPreservation]: 0,
    },
    cpuLevel: "equivalent",
    memoryLevel: "equivalent",
    gpuLevel: "equivalent",
    runtimeLevel: "moderate",
};

// this is a reducer function that updates the state based on the action
export function questionnaireReducer(
    state: QuestionnaireState,
    action: QuestionnaireAction,
): QuestionnaireState {
    switch (action.type) {
        case "setSelectedColumnTypes":
            return { ...state, selectedColumnTypes: action.selectedColumnTypes };
        case "setTableCount":
            return { ...state, tableCount: action.tableCount };
        case "setPurposeMode":
            return { ...state, purposeMode: action.purposeMode };
        case "setSinglePurpose":
            return { ...state, singlePurpose: action.singlePurpose };
        case "setCoinBudget":
            return { ...state, coinBudget: action.coinBudget };
        case "setCpuLevel":
            return { ...state, cpuLevel: action.cpuLevel };
        case "setMemoryLevel":
            return { ...state, memoryLevel: action.memoryLevel };
        case "setGpuLevel":
            return { ...state, gpuLevel: action.gpuLevel };
        case "setRuntimeLevel":
            return { ...state, runtimeLevel: action.runtimeLevel };
        case "reset":
            return initialQuestionnaireState;
        default:
            return state;
    }
}

// this is a context that provides the state and dispatch function to the components
interface QuestionnaireContextValue {
    state: QuestionnaireState;
    dispatch: Dispatch<QuestionnaireAction>;
}

const QuestionnaireContext = createContext<QuestionnaireContextValue | null>(null);

interface QuestionnaireProviderProps {
    children: ReactNode;
}

// this is a provider component that provides the state and dispatch function to the components
export function QuestionnaireProvider({ children }: QuestionnaireProviderProps) {
    const [state, dispatch] = useReducer(questionnaireReducer, initialQuestionnaireState);

    return createElement(
        QuestionnaireContext.Provider,
        { value: { state, dispatch } },
        children,
    );
}

// this is a hook that provides the state and dispatch function to the components
export function useQuestionnaire() {
    const context = useContext(QuestionnaireContext);

    if (context === null) {
        throw new Error("useQuestionnaire must be used within a QuestionnaireProvider");
    }

    return context;
}
