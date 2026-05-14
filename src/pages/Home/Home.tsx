import { useNavigate } from 'react-router-dom';
import { Layout } from '../Layout';
import { Feature } from './components/Feature';
import RadarChartComponent from './components/RadarChart';

import feature1Img from '../../assets/feature1.png';
import feature2Img from '../../assets/feature2.jpg';
import feature3Img from '../../assets/feature3.jpg';
import computerImg from '../../assets/computer.jpg';
import diagramImg from '../../assets/diagram.svg';

const toolCharacteristics: Record<string, { label: string; value: number }[]> = {
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

const Home = () => {
    const navigate = useNavigate();
    const chartEntries = Object.entries(toolCharacteristics);
    const infiniteChartEntries = [...chartEntries, ...chartEntries];

    return (
        <Layout>
            <div className="w-full h-full flex flex-col">
                <div className="w-full bg-linear-to-r from-[#3A7F8F] to-[#4CA2B5] flex flex-col md:flex-row justify-between items-center md:items-start">
                    <div className="w-full md:w-[60%] flex flex-col text-white px-5 md:pl-18 py-12 md:py-20 space-y-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Your Guide to Synthetic Tables
                        </h2>
                        <p className="text-sm sm:text-base md:text-md font-light">
                            Answer a few questions about your dataset to receive personalized tool recommendations from our TDS Benchmark.
                            Generate synthetic datasets, assess their quality, and compare results across state-of-the-art methods. <br /><br />
                            Are you a researcher developing a new TDS tool? Use our benchmarking framework to evaluate your tool against state-of-the-art tools.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                            <a
                                className="bg-text-blue text-white px-6 py-3 rounded-lg w-full sm:w-auto transition border-white border"
                                href="https://github.com/mafedavila/TDSbenchmark"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                For Researchers
                            </a>
                            <button
                                className="bg-white text-text-blue font-semibold px-6 py-3 rounded-lg w-full sm:w-auto"
                                onClick={() => navigate("/synthesis/general-users")}
                            >
                                For Users
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit flex flex-col md:flex-row items-start justify-center gap-10 px-15 py-20">
                    <Feature
                        img={feature1Img}
                        title="Effortless Table Generation"
                        description="Generate high-quality synthetic tables from your original dataset. No need to dive into complex TDS models or tools."
                    />
                    <Feature
                        img={feature2Img}
                        title="Use-Case-Specific Evaluation"
                        description="Assess how useful your synthetic data is for your specific use case through clear, visual results and Comp. Performance insights."
                    />
                    <Feature
                        img={feature3Img}
                        title="Benchmark your TDS Tool"
                        description="Use our framework to evaluate your TDS tool against the a comprehensive taxonomy — including sampling, Bayesian networks, GANs, diffusion models, and Transformer-based models."
                    />
                </div>

                <div className="w-full px-5 lg:px-18 py-10 flex flex-col md:flex-row gap-10 md:gap-0">
                    <div className="w-full md:w-1/2">
                        <h3 id="title-feature" className="text-2xl md:text-3xl font-semibold">
                            Effortless Table Generation
                        </h3>
                        <p className="text-gray-600 mt-4 text-sm md:text-base">
                            Answer a few questions about your dataset to receive personalized tool recommendations from our TDS benchmark.
                            Generate synthetic datasets, assess their quality, and compare results across state-of-the-art methods.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 text-sm md:text-base">
                            <li>What <b>column types</b> are present in the original dataset?</li>
                            <li>Are there any <b>temporal</b> dependencies?</li>
                            <li>Is it one or <b>multiple</b> tables?</li>
                            <li>Do you have a specific <b>privacy budget</b> (like differential privacy)?</li>
                            <li>What <b>computing resources</b> do you have access to (e.g., GPU, CPU, memory)?</li>
                        </ul>
                        <button
                            className="mt-6 bg-text-blue text-white px-6 py-3 rounded-lg"
                            onClick={() => navigate('/synthesis')}
                        >
                            Start generating tables
                        </button>
                    </div>

                    <div className="hidden w-full md:w-1/2 md:flex justify-center md:justify-end">
                        <img
                            src={computerImg}
                            className="w-64 sm:w-80 md:w-[90%] lg:w-[80%] max-w-[500px] rounded-lg object-cover"
                            alt="Computer"
                        />
                    </div>
                </div>

                <div className="w-full h-fit px-5 lg:px-18 py-10 ">
                    <div className="pb-6">
                        <h3 id="title-feature" className="text-2xl md:text-3xl font-semibold">Use-Case-Specific Evaluation</h3>
                        <p className="text-gray-600 mt-2 text-sm md:text-base">Visualize the quality of the synthetic data with respect to different evaluation criteria. Some examples are provided below.</p>
                    </div>
                    <div className="scroll-wrapper">
                        <div className="scroll-content-home gap-12">
                            {infiniteChartEntries.map(([toolName, data], index) => (
                                <div className="w-[380px] shrink-0 flex flex-col items-center" key={`${toolName}-${index}`}>
                                    <h3>{toolName}</h3>
                                    <RadarChartComponent
                                        toolName={toolName}
                                        data={data}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit px-5 lg:px-18 py-10 flex flex-col md:flex-row items-start justify-center gap-10">
                    <div className="w-full md:w-1/2 h-fit">
                        <h3 id="title-feature" className="text-2xl md:text-3xl font-semibold">
                            Benchmark your TDS Tool
                        </h3>
                        <p className="text-gray-600 mt-4 text-sm md:text-base">
                            Use our framework to evaluate your TDS tool against the a comprehensive taxonomy, including sampling, Bayesian networks, GANs, diffusion models, and Transformer-based models.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 text-sm md:text-base">
                            <li>Handling dataset imbalance</li>
                            <li>Dataset augmentation</li>
                            <li>Handling Robustness</li>
                            <li>Privacy</li>
                            <li>Machine Learning Utility</li>
                            <li>Computational Comp. Performance</li>
                        </ul>
                        <button
                            className="my-6 bg-text-blue text-white px-6 py-3 rounded-lg"
                            onClick={() => navigate('/dissertation')}
                        >
                            Benchmarking Framework
                        </button>
                    </div>
                    <div className="w-full h-fit md:flex justify-end items-center md:w-1/2 mt-10 md:mt-0 self-center">
                        <img src={diagramImg} alt="Decision Tree" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;