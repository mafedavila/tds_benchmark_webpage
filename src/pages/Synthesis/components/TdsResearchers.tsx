import { useNavigate } from "react-router-dom";

export const TDSResearchersCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-text-blue">TDS Researchers</h2>
            <p className="text-gray-600">
                Benchmark your synthesis tool against state-of-the-art tools within a unified, reproducible framework.
            </p>

            <h3 className="text-gray-700 font-semibold text-lg mt-2">Step-by-Step Explanation</h3>

            <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                    ✓ Explains, step by step, the trade-offs across pre-processing choices, resource-usage monitoring, and evaluation options.
                </li>
                <li className="flex gap-2">
                    ✓ Automatically chooses the right evaluation metrics.
                </li>
                <li className="flex gap-2">
                    ✓ Lets you choose which model types to compare.
                </li>
                <li className="flex gap-2">
                    ✓ Provides a full-spectrum overview of the functional and non-functional requirements users may place on a TDS tool.
                </li>
                <li className="flex gap-2">
                    ✓ Displays the results with clear, easy-to-understand visuals.
                </li>
                <li className="flex gap-2">
                    ✓ Provides a Jupyter notebook with all requirements to benchmark your tool.
                </li>
            </ul>

            <button
                className="mt-6 w-full bg-text-blue text-white py-3 rounded-xl hover:bg-blue-800 transition"
                onClick={() => navigate("/synthesis/researchers")}
            >
                Select Option
            </button>
        </div>
    );
};