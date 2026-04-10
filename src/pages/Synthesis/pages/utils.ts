const filesMap: Record<string, string> = {
    "GAP": "/files/01_CTAB-GAN_PLUS.zip",
};

export const getFiles = (toolName: string): string => {
    return filesMap[toolName];
}



export const toolCharacteristics: Record<string, { label: string; value: number }[]> = {
    "AutoDiff": [
        { label: "Marginal Distribution", value: 3.83 },
        { label: "Dependency Structure", value: 4.21 },
        { label: "Robustness", value: 2.97 },
        { label: "Privacy", value: 4.37 },
        { label: "Utility", value: 3.61 },
        { label: "Comp. Performance", value: 6.27 }
    ],
    "CTAB-GAN+": [
        { label: "Marginal Distribution", value: 6.90 },
        { label: "Dependency Structure", value: 6.57 },
        { label: "Robustness", value: 6.52 },
        { label: "Privacy", value: 3.43 },
        { label: "Utility", value: 6.73 },
        { label: "Comp. Performance", value: 7.82 }
    ],
    "CTGAN": [
        { label: "Marginal Distribution", value: 7.43 },
        { label: "Dependency Structure", value: 8.36 },
        { label: "Robustness", value: 8.77 },
        { label: "Privacy", value: 5.17 },
        { label: "Utility", value: 9.05 },
        { label: "Comp. Performance", value: 5.35 }
    ],
    "GANBLR++": [
        { label: "Marginal Distribution", value: 10.37 },
        { label: "Dependency Structure", value: 10.29 },
        { label: "Robustness", value: 11 },
        { label: "Privacy", value: 11 },
        { label: "Utility", value: 10.54 },
        { label: "Comp. Performance", value: 7.11 }
    ],
    "GReaT": [
        { label: "Marginal Distribution", value: 8.58 },
        { label: "Dependency Structure", value: 9.18 },
        { label: "Robustness", value: 6.67 },
        { label: "Privacy", value: 4.72 },
        { label: "Utility", value: 9.15 },
        { label: "Comp. Performance", value: 7.12 }
    ],
    "REaLTabFormer": [
        { label: "Marginal Distribution", value: 3.60 },
        { label: "Dependency Structure", value: 3.46 },
        { label: "Robustness", value: 4.75 },
        { label: "Privacy", value: 7.67 },
        { label: "Utility", value: 3.67 },
        { label: "Comp. Performance", value: 9.02 }
    ],
    "SMOTE": [
        { label: "Marginal Distribution", value: 1.27 },
        { label: "Dependency Structure", value: 4.39 },
        { label: "Robustness", value: 1.20 },
        { label: "Privacy", value: 5.70 },
        { label: "Utility", value: 5.34 },
        { label: "Comp. Performance", value: 5.53 }
    ],
    "TVAE": [
        { label: "Marginal Distribution", value: 7.82 },
        { label: "Dependency Structure", value: 9.75 },
        { label: "Robustness", value: 7.23 },
        { label: "Privacy", value: 3.70 },
        { label: "Utility", value: 6.21 },
        { label: "Comp. Performance", value: 5.27 }
    ],
    "TabDDPM": [
        { label: "Marginal Distribution", value: 6.15 },
        { label: "Dependency Structure", value: 6.86 },
        { label: "Robustness", value: 10 },
        { label: "Privacy", value: 7.30 },
        { label: "Utility", value: 5.52 },
        { label: "Comp. Performance", value: 6.58 }
    ],
    "TabSyn": [
        { label: "Marginal Distribution", value: 2.07 },
        { label: "Dependency Structure", value: 6.79 },
        { label: "Robustness", value: 2.50 },
        { label: "Privacy", value: 7.47 },
        { label: "Utility", value: 2.83 },
        { label: "Comp. Performance", value: 6.42 }
    ],
    "TabuLaMiddle": [
        { label: "Marginal Distribution", value: 8.17 },
        { label: "Dependency Structure", value: 6.46 },
        { label: "Robustness", value: 4.42 },
        { label: "Privacy", value: 5.73 },
        { label: "Utility", value: 3.34 },
        { label: "Comp. Performance", value: 10.92 }
    ]
};


export type ColumnType = "cat_num_mixed" | "cat_num_temp" | "cat_num_mixed_text";

interface Step {
    id: string;
    question: string;
    options: { label: string; value: string }[];
}

// All possible steps
export const steps: Step[] = [
    {
        id: "columns",
        question: "What column types are present in the original/target dataset?",
        options: [
            { label: "Categorical, Numerical and Mixed", value: "cat_num_mixed" },
            { label: "Categorical, Numerical and Temporal", value: "cat_num_temp" },
            { label: "Categorical, Numerical, Mixed, Temporal and Text", value: "cat_num_mixed_text" },
        ],
    },
    {
        id: "num_tables",
        question: "How many tables are involved?",
        options: [
            { label: "Two tables", value: "two" },
            { label: "More than two tables", value: "more" },
        ],
    },
    {
        id: "inter_table",
        question: "Is it necessary to preserve inter-table correlations?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "integrity",
        question: "Is preservation of integrity constraints necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "integrity_intertable_customizedgeneration",
        question: "Is preservation of integrity constraints or inter-table correlations or customized generation necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "integrity_temporal",
        question: "Is preservation of integrity constraints or temporal dependencies necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "long-term_temporal",
        question: "Is preservation of long-term temporal dependencies necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "differential_privacy",
        question: "Is differential privacy necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    },
    {
        id: "inter_record",
        question: "Are inter-record constraints necessary?",
        options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
        ],
    }
];

export const getNextStep = (answers: Record<string, string>) => {
    const cols = answers["columns"];

    if (!cols) return "columns";

    if (cols === "cat_num_mixed") {
        if (!answers["inter_table"]) return "inter_table";

        if (answers["inter_table"] === "yes") {
            if (!answers["integrity"]) return "integrity";

            if (answers["integrity"] === "yes") return null; // GAP (result)

            if (answers["integrity"] === "no") {
                if (!answers["num_tables"]) return "num_tables";
                return null; // REaLTabFormer or PrivLava
            }
        }

        if (answers["inter_table"] === "no") {
            if (!answers["integrity"]) return "integrity";

            if (answers["integrity"] === "yes") {
                if (!answers["inter_record"]) return "inter_record";
                    return null;
                }
            
            if (answers["integrity"] === "no") {
                if (!answers["differential_privacy"]) return "differential_privacy";
                return null; // CTAB-GAN+, TabDDPM, AutoDiff, TabSyn
            }
        }
    }

    if (cols === "cat_num_temp") {
        if (!answers["integrity_intertable_customizedgeneration"]) 
            return "integrity_intertable_customizedgeneration";

        if (answers["integrity_intertable_customizedgeneration"] === "yes") return null; // GAP

        if (!answers["long-term_temporal"]) return "long-term_temporal";
        return null;
    }

    if (cols === "cat_num_mixed_text") {
        if (!answers["integrity_temporal"]) return "integrity_temporal";

        if (answers["integrity_temporal"] === "yes") return null; // GAP

        if (!answers["inter_table"]) return "inter_table";

        if (answers["inter_table"] === "yes") {
            if (!answers["num_tables"]) return "num_tables";
            return null;
        }

        return null; // GReaT/TabuLa
    }
    return null;
};

export const getRecommendations = (answers: Record<string, string>): string[] => {
    const cols = answers["columns"] as ColumnType | undefined;
    const numTables = answers["num_tables"];
    const interTable = answers["inter_table"];
    const integrity = answers["integrity"];
    const interTableIntegrityCustomized = answers["integrity_intertable_customizedgeneration"];
    const integrityTemporal = answers["integrity_temporal"];
    const longTermTemporal = answers["long-term_temporal"];
    const differentialPrivacy = answers["differential_privacy"];
    const interRecord = answers["inter_record"];

    const recs = new Set<string>();

    if(cols === "cat_num_mixed") {
        if(interTable === "yes"){
            if(integrity === "yes"){
                recs.add("GAP");
            }
            if(integrity === "no"){
                if(numTables === "two"){
                    recs.add("REaLTabFormer");
                }
                if(numTables === "more"){
                    recs.add("PrivLava");
                }
            }
        }
        if(interTable === "no"){
            if(integrity === "yes"){
                if(interRecord === "no"){
                    recs.add("C3TGAN");
                }
                if(interRecord === "yes"){
                    recs.add("Kamino");
                }
            }
            if(integrity === "no"){
                if(differentialPrivacy === "yes"){
                    recs.add("CTAB-GAN+");
                }
                if(differentialPrivacy === "no"){
                    recs.add("TabDDPM");
                    recs.add("CTAB-GAN");
                    recs.add("AutoDiff");
                    recs.add("TabSyn");
                }
            }
        }
    }

    if(cols === "cat_num_temp"){
        if(interTableIntegrityCustomized === "yes"){
            recs.add("GAP");
        }else if(interTableIntegrityCustomized === "no"){
            if(longTermTemporal === "yes"){
                recs.add("DoppelGANger");
            }else if (longTermTemporal === "no"){
                recs.add("TimeGAN");
                recs.add("TimeVAE");
                recs.add("TSGM");
            }
        }
    }

    if(cols === "cat_num_mixed_text"){
        if(integrityTemporal === "yes"){
            recs.add("GAP");
        }else if(integrityTemporal === "no"){
            if(interTable === "yes"){
                if(numTables === "two"){
                    recs.add("REaLTabFormer");
                }
                if(numTables === "more"){
                    recs.add("GAP");
                }
            }
            if(interTable === "no"){
                recs.add("GReaT");
                recs.add("TabuLa");
            }
        }
    }

    return Array.from(recs);
};