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
            </div>
        </Layout>
    );
};

export default Dissertation;