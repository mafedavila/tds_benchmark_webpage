import { useNavigate } from "react-router-dom";

export const GeneralUsersCard = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-white rounded-2xl shadow-md p-8 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-text-blue">General Users</h2>
            <p className="text-gray-600">
                Explore, generate, and evaluate synthetic tables without technical complexity.
                <br />
                Get recommendations and insights for your use case.
            </p>

            <h3 className="text-gray-700 font-semibold text-lg mt-2">Fully automatic</h3>

            <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                    ✓ Suggests the necessary pre-processing steps based on your original dataset.
                </li>
                <li className="flex gap-2">
                    ✓ Recommends up to three tools that best fit your use case.
                </li>
                <li className="flex gap-2">
                    ✓ Automatically chooses the right evaluation metrics.
                </li>
                <li className="flex gap-2">
                    ✓ Provides examples similar to your use case.
                </li>
                <li className="flex gap-2">
                    ✓ Provides a complete Jupyter notebook with all requirements ready to synthesize your data.
                </li>
            </ul>

            <button
                className="mt-6 w-full bg-text-blue text-white py-3 rounded-xl hover:bg-blue-800 transition"
                onClick={() => navigate("/synthesis/general-users")}
            >
                Select Option
            </button>
        </div>
    );
};