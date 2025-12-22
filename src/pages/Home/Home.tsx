import { Layout } from '../Layout';
import { Feature } from './components/Feature';
import RadarChartComponent from './components/RadarChart';

const toolCharacteristics: Record<string, { label: string; value: number }[]> = {
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

const Home = () => {
    return (
        <Layout>
            <div className="w-full h-full flex flex-col">
                <div className="w-full bg-linear-to-r from-[#048EEC] to-[#18C8FE] flex flex-col md:flex-row justify-between items-center md:items-start">
                    {/* LEFT TEXT */}
                    <div className="w-full md:w-[60%] flex flex-col text-white px-5 md:pl-18 py-12 md:py-20 space-y-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Your Guide to Artificial Tables
                        </h2>
                        <p className="text-sm sm:text-base md:text-md font-light">
                        Answer a few questions about your dataset to receive personalized tool recommendations from our TDS Benchmark.
                        Generate synthetic datasets, assess their quality, and compare results across state-of-the-art methods. <br /><br />
                        Are you a researcher developing a new TDS tool? Use our benchmarking framework to evaluate your tool against state-of-the-art tools.
                        </p>

                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                            <button className="bg-text-blue text-white px-6 py-3 rounded-lg w-full sm:w-auto"
                                onClick={() => window.location.href = "/synthesis/researchers"}>
                                For Researchers
                            </button>
                            <button className="bg-white text-text-blue font-semibold px-6 py-3 rounded-lg w-full sm:w-auto"
                                onClick={() => window.location.href = "/synthesis/general-users"}>
                                For Users
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit flex flex-col md:flex-row items-start justify-center gap-10 px-15 py-20">
                    <Feature img="src/assets/feature1.png" 
                        title="Effortless Table Generation" 
                        description="Generate high-quality synthetic tables from your original dataset — no need to dive into complex TDS models or tools." 
                    />
                    <Feature img="src/assets/feature2.jpg" 
                        title="Use-Case-Specific Evaluation" 
                        description="Assess how useful your synthetic data is for your specific use case through clear, visual results and performance insights."
                    />
                    <Feature img="src/assets/feature3.jpg" 
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
                        <button className="mt-6 bg-text-blue text-white px-6 py-3 rounded-lg"
                            onClick={() => window.location.href='/synthesis'}
                        >
                            Start generating tables
                        </button>
                    </div>
                    
                    <div className="hidden w-full md:w-1/2 md:flex justify-center md:justify-end">
                        <img
                            src="src/assets/computer.jpg"
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
                    <div className="w-full overflow-x-auto flex gap-6">
                        {Object.entries(toolCharacteristics).slice(0,3).map(([toolName, data]) => (
                                <div className="w-full flex flex-col items-center" key={toolName}>
                                    <h3>{toolName}</h3>
                                    <RadarChartComponent 
                                        key={toolName}
                                        toolName={toolName}
                                        data={data} 
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="w-full h-fit px-5 lg:px-18 py-10 flex flex-col md:flex-row items-start justify-center gap-10">
                    <div className="w-full md:w-1/2 h-fit">
                        <h3 id="title-feature" className="text-2xl md:text-3xl font-semibold">
                            Benchmark your TDS Tool
                        </h3>
                        <p className="text-gray-600 mt-4 text-sm md:text-base">
                            Use our framework to evaluate your TDS tool against the a comprehensive taxonomy — including sampling, Bayesian networks, GANs, diffusion models, and Transformer-based models.
                        </p>
                        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 text-sm md:text-base">
                            <li>Handling dataset imbalance</li>
                            <li>Dataset augmentation</li>
                            <li>Handling missing values</li>
                            <li>Privacy</li>
                            <li>Machine Learning Utility</li>
                            <li>Computational Performance</li>
                        </ul>
                        <button className="my-6 bg-text-blue text-white px-6 py-3 rounded-lg"
                            onClick={() => window.location.href='/dissertation'}>
                            Benchmarking Framework
                        </button>
                    </div>
                    <div className="w-full h-fit md:flex justify-end items-center md:w-1/2 mt-10 md:mt-0 self-center">
                        <img src="src/assets/diagram.svg" alt="Decision Tree"></img>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;