import { useState } from "react";
import { Layout } from "../Layout";
import ArticleCard from "./components/ArticleCard";

const Publications = () => {
    const [query, setQuery] = useState("");

    const articles = [
        {
            title: "Benchmarking Tabular Data Synthesis: Evaluating Tools, Metrics, and Datasets on Prosumer Hardware for End-Users",
            publishedIn: "Data Science Journal",
            year: 2025,
            description: "This study presents a benchmark for tabular data synthesis (TDS) tools, evaluating their performance across six critical dimensions: handling dataset imbalance, dataset augmentation, handling missing values, privacy, machine learning (ML) utility, and computational performance. Our findings provide practical insights to guide tool selection based on specific use cases and constraints. We assessed 13 tools across 15 datasets from different use cases, focusing on prosumer hardware configurations for end-users and highlight the trade-offs among various TDS models.",
            href: "",
        },
        {
            title: "Measuring LLM Sensitivity in Transformer-based Tabular Data Synthesis",
            publishedIn: "ArXiV",
            year: 2025,
            description: "This study presents a sensitivity assessment on how the choice of hyperparameters, such as number of layers or hidden dimension affects the quality of the resultant synthetic data and the computational performance. It is performed across two tools, GReaT and REaLTabFormer, evaluating 10 model setups that vary in architecture type and depth.",
            href: "https://arxiv.org/abs/2509.20768"
        },
        {
            title: "Navigating Tabular Data Synthesis Research: Understanding User Needs and Tool Capabilities",
            publishedIn: "ACM SIGMOD Record",
            year: 2024,
            description: "This paper presents a comprehensive analysis of tabular data synthesis (TDS) research, focusing on aligning user needs with tool capabilities.",
            href: "https://dl.acm.org/doi/10.1145/3712311.3712315"
        },
        {
            title: "Container-Based Microservices Application for Product Carbon Footprint Calculation in Manufacturing Companies",
            publishedIn: "EnviroInfo",
            year: 2025,
            description: "This paper introduces a highly customizable open-source tool for calculating product carbon footprints based on ISO 14067 and CSRD guidelines using a container-based microservices architecture. The tool ensures scalability, ease of use, and data security, working with existing manufacturing digital tools and providing clear carbon footprint visualizations to enhance companies' sustainability efforts.",
            href: "https://dl.gi.de/handle/20.500.12116/45991"
        },
        {
            title: "Benchmarking Tabular Data Synthesis for User Guidance",
            publishedIn: "EDBT/ICDT Joint Conference",
            year: 2024,
            description:"This work presented the idea in a PhD Workshop to benchmark tabular data synthesis tools, to offer insights for user guidance.",
            href:"https://ceur-ws.org/Vol-3651/PhDW-2.pdf"
        },
        {
            title: "Digital Twins: Enhancing Circular Economy through Digital Tools",
            publishedIn: "Procedia CIRP",
            year: 2024,
            description:"This paper discusses the state of the art of digital twins and presents a digital shadow—a comprehensive digital tool design to support manufacturers during the product design phase. Drawing from a case study in the automotive sector, this tool not only aligns with recycling and sustainability objectives but also mitigates risks associated with raw material dependencies.",
            href:""
        },
        {
            title: "Paving the Way for Hybrid Teaching in Higher Education: Lessons from Students' Perceptions and Acceptance of Different Teaching Modes during and after the Pandemic",
            publishedIn: "Creative Education",
            year: 2023,
            description:"This study explores hybrid teaching in higher education, focusing on student perceptions and acceptance post-pandemic.",
            href:"https://www.scirp.org/journal/paperinformation?paperid=125257"
        },
        {
            title: "Sustainability Digital Twin: a tool for the manufacturing industry",
            publishedIn: "Procedia CIRP",
            year: 2023,
            description:"This paper presents the development of a framework for the assessment of energy efficiency and sustainability of production processes, with respect to the measured consumption of the different resources.",
            href:"https://www.sciencedirect.com/science/article/pii/S2212827123000252"
        },
        {
            title: "The application of image recognition methods to improve the performance of waste-to-energy plants",
            publishedIn: "EnviroInfo",
            year: 2022,
            description:"In this paper, we present an image recognition method to improve the performance of waste-to-energy plants.",
            href:"https://dl.gi.de/items/d3ce5086-3267-4196-bbf2-7637632fce72"
        },
        {
            title: "Quantifying the Environmental Impacts of Battery Electric Vehicles from a Criticality Perspective",
            publishedIn: "IEEE 28th International Conference on Engineering, Technology, and Innovation",
            year: 2022,
            description:"This paper quantifies the environmental impacts of battery electric vehicles with a focus on criticality.",
            href:"https://ieeexplore.ieee.org/document/10033264"
        },
        {
            title: "Paving the Way for Hybrid Teaching in Higher Education: Lessons from Students' Perceptions and Acceptance of Different Teaching Modes during and after the Pandemic",
            publishedIn: "Creative Education",
            year: 2023,
            description:"This study explores hybrid teaching in higher education, focusing on student perceptions and acceptance post-pandemic.",
            href:"https://www.scirp.org/journal/paperinformation?paperid=125257"
        },
    ];

    const filteredArticles = articles.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Layout>
            <div className="w-full h-fit flex flex-col items-center pt-10 pb-20 px-5 lg:px-18">

                <h1 className="text-3xl md:text-4xl font-bold text-text-blue my-8">
                    Publications
                </h1>

                <p className="text-gray-600 mb-8">Published Articles</p>

                {/* 🔍 SEARCH BAR */}
                <div className="w-full max-w-5xl flex justify-center">
                    <div className="w-full bg-[#e5e5e5] rounded-3xl flex items-center p-4">
                        <input
                            type="text"
                            placeholder="Search an Article"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-gray-600 placeholder-gray-500 px-4 text-lg"
                        />

                        <button className="hidden md:flex bg-[#053B7C] text-white px-8 py-3 rounded-2xl text-lg font-semibold">
                            Search
                        </button>
                    </div>
                </div>

                {/* 📝 Article List */}
                <div className="w-full max-w-5xl flex flex-col gap-6 mt-10">
                    {filteredArticles.length === 0 ? (
                        <p className="text-gray-500 text-center">
                            No articles found.
                        </p>
                    ) : (
                        filteredArticles.map((a) => (
                            <ArticleCard
                                key={a.title}
                                title={a.title}
                                publishedIn={a.publishedIn}
                                year={a.year}
                                description={a.description}
                                href={a.href}
                            />
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Publications;