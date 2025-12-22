import { Layout } from "../Layout"

const Dissertation = () => {
    return (
        <Layout>
            <div className="max-w-5xl mx-auto px-5 lg:px-0 py-10">
                <h2 className="text-4xl text-text-blue text-center font-bold mb-6">Dissertation</h2>
                <p className="text-lg text-gray-700 text-center">
                    This dissertation introduces a benchmarking framework to evaluate the performance, scalability, and suitability of tabular data synthesis models on commodity hardware.
                </p>
                <p className="text-lg text-gray-700 text-center mt-4">
                    By systematically assessing multiple synthesis techniques, this work provides quantitative insights and practical guidance for researchers and practitioners looking to integrate synthetic data solutions. Read the dissertation below or download it here.
                </p>
                <a href="/2025_Dissertation_Davila.pdf" 
                    download 
                    className="w-full text-center mt-6 inline-block px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Download Dissertation (PDF)
                </a>
            </div>
        </Layout>
    );
};

export default Dissertation;