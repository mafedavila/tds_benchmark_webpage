# TDS Benchmark Platform

Interactive platform for exploring, comparing, and selecting **Tabular Data Synthesis (TDS)** tools based on the results of a comprehensive benchmarking framework.

🌐 **Platform:** https://mafedavila.github.io/tds_benchmark_webpage/

🔬 **Benchmark repository:** https://github.com/mafedavila/TDSbenchmark

---

## Overview

Tabular Data Synthesis (TDS) provides models for generating artificial tabular datasets that preserve relevant characteristics of real data. A growing number of synthesis tools are available, but their suitability depends strongly on the dataset, intended use case, privacy requirements, and available computational resources.

This platform was developed as part of the dissertation research **“Benchmarking Tabular Data Synthesis: Framework for Evaluating Use-Case Suitability and Performance on Commodity Hardware.”**

Rather than identifying a single universally best synthesis model, the platform supports **use-case-oriented tool selection**. It provides an interactive interface to explore benchmark results, compare tools across multiple evaluation dimensions, and identify methods that are better suited to specific requirements.

The platform connects the experimental results of the TDS Benchmark with a user-oriented decision interface, making the benchmark accessible beyond the underlying code and individual evaluation metrics.

---

## What can you do with the platform?

The platform allows users to:

- Explore and compare different TDS tools.
- Inspect their strengths and limitations across several evaluation dimensions.
- Compare tools according to dataset and use-case requirements.
- Examine computational requirements such as runtime, CPU, GPU, and memory consumption.
- Explore the methodology and evaluation metrics used in the benchmark.
- Access the publications and dissertation associated with the research.
- Use benchmark results as decision support when selecting a TDS tool.
- Contribute to the benchmark by adding your tool.

The objective is not simply to rank tools, but to provide information that helps users determine **which tool is suitable for a particular application**.

---

## Evaluation Dimensions

The benchmark evaluates TDS tools from six dimensions:

### 1. Marginal Distributions

Measures how well individual synthetic columns reproduce the statistical distributions of their corresponding real-data columns.

Continuous variables are evaluated using metrics such as:

- Wasserstein Distance
- Kolmogorov–Smirnov statistic

Categorical variables are evaluated using:

- Jensen–Shannon divergence
- Kullback–Leibler divergence

---

### 2. Dependency Structure

Evaluates whether relationships between variables are preserved in the synthetic data.

The benchmark compares dependency measures between real and synthetic datasets using correlations including:

- Pearson
- Spearman
- Kendall
- Point-Biserial

Smaller differences between real and synthetic correlations indicate better preservation of the original dependency structure.

---

### 3. Robustness

Evaluates how synthesis tools behave when the input data contain missing values.

This dimension helps identify whether a synthesis method can remain usable under imperfect or incomplete real-world data conditions.

---

### 4. Privacy

Evaluates whether synthetic observations are excessively similar to records in the original dataset.

The benchmark includes nearest-neighbor-based privacy indicators such as:

- Distance to Closest Record (DCR)
- Nearest Neighbor Distance Ratio (NNDR)

These metrics help characterize the relationship between synthetic samples and their nearest real observations.

---

### 5. Utility

Measures whether synthetic data preserve information that is useful for downstream application.

Models are trained using synthetic data and evaluated using real test data.

For classification tasks, the benchmark evaluates several algorithms, including:

- Decision Tree
- Gaussian Naive Bayes
- K-Nearest Neighbors
- Linear SVM
- RBF SVM
- Logistic Regression
- Multilayer Perceptron
- Perceptron
- Random Forest

For regression tasks:

- Linear Regression
- Ridge Regression
- Lasso Regression
- Bayesian Ridge Regression

This evaluation provides an indication of whether synthetic data can replace or complement real training data for predictive modeling.

---

### 6. Computational Performance

Synthetic data generation can require substantially different amounts of computational resources depending on the synthesis method.

The benchmark therefore monitors:

- Runtime
- CPU usage
- GPU usage
- Memory consumption

Including computational performance makes it possible to assess not only whether a tool produces useful synthetic data, but also whether it is practical under realistic hardware constraints.

---

## Reproducibility

A central objective of the project is to provide a reproducible framework for comparing TDS methods.

The benchmark standardizes:

- Experiment configuration
- Dataset handling
- Tool execution
- Evaluation procedures
- Computational monitoring
- Repeated synthesis runs
- Result aggregation

At the same time, tool-specific implementations remain isolated so that synthesis methods with different libraries, Python versions, dependencies, and hardware requirements can be evaluated through a common interface.

Each benchmark experiment generates **five synthetic datasets per tool–dataset pair**, allowing variability across synthesis runs to be considered during evaluation.

---

### Clone the repository

```bash
git clone https://github.com/mafedavila/tds_benchmark_webpage.git
cd tds_benchmark_webpage
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## Author

**Maria Fernanda Davila Restrepo**

Doctoral research on Tabular Data Synthesis, benchmarking, and data-driven tool selection.

GitHub: https://github.com/mafedavila
