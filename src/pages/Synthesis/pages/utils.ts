const filesMap: Record<string, string> = {
    "GAP": "/files/01_CTAB-GAN_PLUS.zip",
};

export const getFiles = (toolName: string): string => {
    return filesMap[toolName];
}



export const toolCharacteristics: Record<string, { label: string; value: number }[]> = {
    "Sampling": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 8 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 8 },
        { label: "ML Utility", value: 6 },
        { label: "Privacy", value: 4 }
    ],
    "Bayesian Network": [
        { label: "Missing Values", value: 6 },
        { label: "Data Augmentation", value: 6 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 8 },
        { label: "ML Utility", value: 5 },
        { label: "Privacy", value: 6 }
    ],
    "CTAB-GAN": [
        { label: "Missing Values", value: 5 },
        { label: "Data Augmentation", value: 6 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 7 },
        { label: "ML Utility", value: 8 },
        { label: "Privacy", value: 7 }
    ],
    "CTAB-GAN+": [
        { label: "Missing Values", value: 5 },
        { label: "Data Augmentation", value: 6 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 7 },
        { label: "ML Utility", value: 8 },
        { label: "Privacy", value: 7 }
    ],
    "VAE": [
        { label: "Missing Values", value: 5 },
        { label: "Data Augmentation", value: 6 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 7 },
        { label: "ML Utility", value: 6 },
        { label: "Privacy", value: 5 }
    ],
    "TabDDPM": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 8 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 8 },
        { label: "ML Utility", value: 7 },
        { label: "Privacy", value: 9 }
    ],
    "GAP": [
        { label: "Missing Values", value: 3 },
        { label: "Data Augmentation", value: 3 },
        { label: "Dataset Balancing", value: 4 },
        { label: "Performance", value: 4 },
        { label: "ML Utility", value: 3 },
        { label: "Privacy", value: 2 }
    ],
    "AutoDiff": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 8 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "TabSyn": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 7 },
        { label: "Performance", value: 8 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "REaLTabFormer": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "GReaT": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "TabuLa": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "C3TGAN": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "Kamino": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "PrivLava": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "TimeVAE": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "TimeGAN": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "TSGM": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
    ],
    "DoppelGANger": [
        { label: "Missing Values", value: 8 },
        { label: "Data Augmentation", value: 9 },
        { label: "Dataset Balancing", value: 8 },
        { label: "Performance", value: 6 },
        { label: "ML Utility", value: 9 },
        { label: "Privacy", value: 7 }
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