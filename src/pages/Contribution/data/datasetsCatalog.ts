import type { DatasetCatalogEntry } from "../types";

export const DATASET_CATALOG: DatasetCatalogEntry[] = [
  {
    "dataset": "abalone",
    "problem_type": "regression",
    "target": "rings",
    "columns": {
      "categorical": [
        "sex"
      ],
      "continuous": [
        "length",
        "diameter",
        "height",
        "whole_weight",
        "shucked_weight",
        "viscera_weight",
        "shell_weight"
      ],
      "integer": [
        "rings"
      ],
      "mixed": {},
      "log": [],
      "general": [
        "length",
        "diameter",
        "height"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "adult",
    "problem_type": "classification",
    "target": "income",
    "columns": {
      "categorical": [
        "workclass",
        "education",
        "marital-status",
        "occupation",
        "relationship",
        "race",
        "gender",
        "native-country",
        "income"
      ],
      "continuous": [
        "fnlwgt",
        "capital-gain",
        "capital-loss",
        "hours-per-week",
        "age"
      ],
      "integer": [
        "age",
        "fnlwgt",
        "capital-gain",
        "capital-loss",
        "hours-per-week"
      ],
      "mixed": {
        "capital-loss": [
          0
        ],
        "capital-gain": [
          0
        ]
      },
      "log": [],
      "general": [
        "age"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "airline",
    "problem_type": "regression",
    "target": "price",
    "columns": {
      "categorical": [
        "airline",
        "flight",
        "source_city",
        "departure_time",
        "stops",
        "arrival_time",
        "destination_city",
        "class"
      ],
      "continuous": [
        "duration",
        "days_left"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "california",
    "problem_type": "regression",
    "target": "median_house_value",
    "columns": {
      "categorical": [
        "ocean_proximity"
      ],
      "continuous": [
        "longitude",
        "latitude",
        "median_income",
        "median_house_value"
      ],
      "integer": [
        "housing_median_age",
        "total_rooms",
        "total_bedrooms",
        "population",
        "households"
      ],
      "mixed": {},
      "log": [],
      "general": [
        "longitude",
        "latitude",
        "housing_median_age",
        "total_rooms",
        "total_bedrooms",
        "population",
        "households",
        "median_income"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "cardio",
    "problem_type": "classification",
    "target": "cardio",
    "columns": {
      "categorical": [
        "cardio",
        "gender",
        "cholesterol",
        "gluc",
        "smoke",
        "alco",
        "active"
      ],
      "continuous": [
        "age",
        "height",
        "weight",
        "ap_hi",
        "ap_lo"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [
        "id",
        "age",
        "height",
        "weight",
        "ap_hi",
        "ap_lo"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "churn2",
    "problem_type": "classification",
    "target": "Exited",
    "columns": {
      "categorical": [
        "Exited",
        "Geography",
        "Gender",
        "HasCrCard",
        "IsActiveMember"
      ],
      "continuous": [
        "CreditScore",
        "Age",
        "Tenure",
        "Balance",
        "NumOfProducts",
        "EstimatedSalary"
      ],
      "integer": [],
      "mixed": {
        "Balance": [
          0
        ]
      },
      "log": [],
      "general": [
        "CreditScore",
        "Age",
        "Tenure",
        "Balance",
        "NumOfProducts",
        "EstimatedSalary"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "covertype-small",
    "problem_type": "classification",
    "target": "Cover_Type",
    "columns": {
      "categorical": [
        "Cover_Type"
      ],
      "continuous": [
        "Elevation",
        "Aspect",
        "Slope",
        "Horizontal_Distance_To_Hydrology",
        "Vertical_Distance_To_Hydrology",
        "Horizontal_Distance_To_Roadways",
        "Hillshade_9am",
        "Hillshade_Noon",
        "Hillshade_3pm",
        "Horizontal_Distance_To_Fire_Points",
        "Wilderness_Area1",
        "Wilderness_Area2",
        "Wilderness_Area3",
        "Wilderness_Area4",
        "Soil_Type1",
        "Soil_Type2",
        "Soil_Type3",
        "Soil_Type4",
        "Soil_Type5",
        "Soil_Type6",
        "Soil_Type7",
        "Soil_Type8",
        "Soil_Type9",
        "Soil_Type10",
        "Soil_Type11",
        "Soil_Type12",
        "Soil_Type13",
        "Soil_Type14",
        "Soil_Type15",
        "Soil_Type16",
        "Soil_Type17",
        "Soil_Type18",
        "Soil_Type19",
        "Soil_Type20",
        "Soil_Type21",
        "Soil_Type22",
        "Soil_Type23",
        "Soil_Type24",
        "Soil_Type25",
        "Soil_Type26",
        "Soil_Type27",
        "Soil_Type28",
        "Soil_Type29",
        "Soil_Type30",
        "Soil_Type31",
        "Soil_Type32",
        "Soil_Type33",
        "Soil_Type34",
        "Soil_Type35",
        "Soil_Type36",
        "Soil_Type37",
        "Soil_Type38",
        "Soil_Type39",
        "Soil_Type40"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "covertype",
    "problem_type": "classification",
    "target": "Cover_Type",
    "columns": {
      "categorical": [
        "Cover_Type"
      ],
      "continuous": [
        "Elevation",
        "Aspect",
        "Slope",
        "Horizontal_Distance_To_Hydrology",
        "Vertical_Distance_To_Hydrology",
        "Horizontal_Distance_To_Roadways",
        "Hillshade_9am",
        "Hillshade_Noon",
        "Hillshade_3pm",
        "Horizontal_Distance_To_Fire_Points",
        "Wilderness_Area1",
        "Wilderness_Area2",
        "Wilderness_Area3",
        "Wilderness_Area4",
        "Soil_Type1",
        "Soil_Type2",
        "Soil_Type3",
        "Soil_Type4",
        "Soil_Type5",
        "Soil_Type6",
        "Soil_Type7",
        "Soil_Type8",
        "Soil_Type9",
        "Soil_Type10",
        "Soil_Type11",
        "Soil_Type12",
        "Soil_Type13",
        "Soil_Type14",
        "Soil_Type15",
        "Soil_Type16",
        "Soil_Type17",
        "Soil_Type18",
        "Soil_Type19",
        "Soil_Type20",
        "Soil_Type21",
        "Soil_Type22",
        "Soil_Type23",
        "Soil_Type24",
        "Soil_Type25",
        "Soil_Type26",
        "Soil_Type27",
        "Soil_Type28",
        "Soil_Type29",
        "Soil_Type30",
        "Soil_Type31",
        "Soil_Type32",
        "Soil_Type33",
        "Soil_Type34",
        "Soil_Type35",
        "Soil_Type36",
        "Soil_Type37",
        "Soil_Type38",
        "Soil_Type39",
        "Soil_Type40"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "credit-small",
    "problem_type": "classification",
    "target": "Class",
    "columns": {
      "categorical": [
        "Class"
      ],
      "continuous": [
        "Time",
        "V1",
        "V2",
        "V3",
        "V4",
        "V5",
        "V6",
        "V7",
        "V8",
        "V9",
        "V10",
        "V11",
        "V12",
        "V13",
        "V14",
        "V15",
        "V16",
        "V17",
        "V18",
        "V19",
        "V20",
        "V21",
        "V22",
        "V23",
        "V24",
        "V25",
        "V26",
        "V27",
        "V28",
        "Amount"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "credit",
    "problem_type": "classification",
    "target": "Class",
    "columns": {
      "categorical": [
        "Class"
      ],
      "continuous": [
        "Time",
        "V1",
        "V2",
        "V3",
        "V4",
        "V5",
        "V6",
        "V7",
        "V8",
        "V9",
        "V10",
        "V11",
        "V12",
        "V13",
        "V14",
        "V15",
        "V16",
        "V17",
        "V18",
        "V19",
        "V20",
        "V21",
        "V22",
        "V23",
        "V24",
        "V25",
        "V26",
        "V27",
        "V28",
        "Amount"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "diabetes",
    "problem_type": "classification",
    "target": "Outcome",
    "columns": {
      "categorical": [
        "Outcome",
        "Pregnancies"
      ],
      "continuous": [
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI",
        "DiabetesPedigreeFunction",
        "Age"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [
        "Pregnancies",
        "Glucose",
        "BloodPressure",
        "SkinThickness",
        "Insulin",
        "BMI",
        "DiabetesPedigreeFunction",
        "Age"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "higgs-small",
    "problem_type": "classification",
    "target": "y",
    "columns": {
      "categorical": [
        "y"
      ],
      "continuous": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "house",
    "problem_type": "regression",
    "target": "price",
    "columns": {
      "categorical": [],
      "continuous": [
        "P1",
        "P5p1",
        "P6p2",
        "P11p4",
        "P14p9",
        "P15p1",
        "P15p3",
        "P16p2",
        "P18p2",
        "P27p4",
        "H2p2",
        "H8p2",
        "H10p1",
        "H13p1",
        "H18pA",
        "H40p4"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "insurance",
    "problem_type": "regression",
    "target": "charges",
    "columns": {
      "categorical": [
        "sex",
        "smoker",
        "region"
      ],
      "continuous": [
        "age",
        "bmi",
        "children"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "king",
    "problem_type": "regression",
    "target": "price",
    "columns": {
      "categorical": [
        "bedrooms",
        "bathrooms",
        "floors",
        "waterfront",
        "view",
        "condition",
        "grade"
      ],
      "continuous": [
        "sqft_living",
        "sqft_lot",
        "sqft_above",
        "sqft_basement",
        "yr_built",
        "yr_renovated",
        "lat",
        "long",
        "sqft_living15",
        "sqft_lot15"
      ],
      "integer": [
        "bedrooms",
        "floors",
        "sqft_above",
        "sqft_basement",
        "yr_built",
        "yr_renovated",
        "zipcode",
        "price"
      ],
      "mixed": {
        "sqft_basement": [
          0
        ],
        "yr_renovated": [
          0
        ]
      },
      "log": [],
      "general": [
        "bathrooms",
        "sqft_living",
        "sqft_above",
        "yr_built",
        "long",
        "sqft_living15"
      ],
      "non_categorical": []
    }
  },
  {
    "dataset": "loan",
    "problem_type": "classification",
    "target": "PersonalLoan",
    "columns": {
      "categorical": [
        "PersonalLoan",
        "Education",
        "SecuritiesAccount",
        "CDAccount",
        "Online",
        "CreditCard"
      ],
      "continuous": [
        "Age",
        "Experience",
        "Income",
        "Family",
        "CCAvg",
        "Mortgage"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "miniboone-small",
    "problem_type": "classification",
    "target": "label",
    "columns": {
      "categorical": [
        "label"
      ],
      "continuous": [
        "feature_1",
        "feature_2",
        "feature_3",
        "feature_4",
        "feature_5",
        "feature_6",
        "feature_7",
        "feature_8",
        "feature_9",
        "feature_10",
        "feature_11",
        "feature_12",
        "feature_13",
        "feature_14",
        "feature_15",
        "feature_16",
        "feature_17",
        "feature_18",
        "feature_19",
        "feature_20",
        "feature_21",
        "feature_22",
        "feature_23",
        "feature_24",
        "feature_25",
        "feature_26",
        "feature_27",
        "feature_28",
        "feature_29",
        "feature_30",
        "feature_31",
        "feature_32",
        "feature_33",
        "feature_34",
        "feature_35",
        "feature_36",
        "feature_37",
        "feature_38",
        "feature_39",
        "feature_40",
        "feature_41",
        "feature_42",
        "feature_43",
        "feature_44",
        "feature_45",
        "feature_46",
        "feature_47",
        "feature_48",
        "feature_49",
        "feature_50"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "miniboone",
    "problem_type": "classification",
    "target": "label",
    "columns": {
      "categorical": [
        "label"
      ],
      "continuous": [
        "feature_1",
        "feature_2",
        "feature_3",
        "feature_4",
        "feature_5",
        "feature_6",
        "feature_7",
        "feature_8",
        "feature_9",
        "feature_10",
        "feature_11",
        "feature_12",
        "feature_13",
        "feature_14",
        "feature_15",
        "feature_16",
        "feature_17",
        "feature_18",
        "feature_19",
        "feature_20",
        "feature_21",
        "feature_22",
        "feature_23",
        "feature_24",
        "feature_25",
        "feature_26",
        "feature_27",
        "feature_28",
        "feature_29",
        "feature_30",
        "feature_31",
        "feature_32",
        "feature_33",
        "feature_34",
        "feature_35",
        "feature_36",
        "feature_37",
        "feature_38",
        "feature_39",
        "feature_40",
        "feature_41",
        "feature_42",
        "feature_43",
        "feature_44",
        "feature_45",
        "feature_46",
        "feature_47",
        "feature_48",
        "feature_49",
        "feature_50"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "payroll-small",
    "problem_type": "regression",
    "target": "REGULAR_PAY",
    "columns": {
      "categorical": [
        "EMPLOYMENT_TYPE",
        "JOB_STATUS",
        "GENDER",
        "ETHNICITY"
      ],
      "continuous": [
        "PAY_YEAR",
        "OVERTIME_PAY",
        "ALL_OTHER_PAY",
        "TOTAL_PAY",
        "MOU",
        "MOU_TITLE",
        "CITY_RETIREMENT_CONTRIBUTIONS",
        "BENEFIT_PAY"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "payroll",
    "problem_type": "regression",
    "target": "REGULAR_PAY",
    "columns": {
      "categorical": [
        "DEPARTMENT_NO",
        "DEPARTMENT_TITLE",
        "JOB_CLASS_PGRADE",
        "JOB_TITLE",
        "EMPLOYMENT_TYPE",
        "JOB_STATUS",
        "MOU",
        "MOU_TITLE",
        "GENDER",
        "ETHNICITY"
      ],
      "continuous": [
        "PAY_YEAR",
        "OVERTIME_PAY",
        "ALL_OTHER_PAY",
        "TOTAL_PAY",
        "CITY_RETIREMENT_CONTRIBUTIONS",
        "BENEFIT_PAY"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  },
  {
    "dataset": "wilt",
    "problem_type": "classification",
    "target": "class",
    "columns": {
      "categorical": [
        "class"
      ],
      "continuous": [
        "GLCM_pan",
        "Mean_Green",
        "Mean_Red",
        "Mean_NIR",
        "SD_pan"
      ],
      "integer": [],
      "mixed": {},
      "log": [],
      "general": [],
      "non_categorical": []
    }
  }
];
