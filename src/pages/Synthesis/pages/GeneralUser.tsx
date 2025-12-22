import { useState } from "react";
import { Layout } from "../../Layout";
import RadarChartComponent from "./components/RadarChartComponent";
import { getFiles, toolCharacteristics, steps, getNextStep, getRecommendations } from "./utils";


export default function DecisionGuide() {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [currentStepId, setCurrentStepId] = useState<string>("columns");
    const [finished, setFinished] = useState<boolean>(false);

    const handleAnswer = (stepId: string, value: string) => {
        const updated = { ...answers, [stepId]: value };
        setAnswers(updated);
        const next = getNextStep(updated);

        if (next === null) {
            setFinished(true);
        } else {
            setCurrentStepId(next);
        }
    };

    const restart = () => {
        setAnswers({});
        setFinished(false);
        setCurrentStepId("columns");
    };

    const currentStep = steps.find((s) => s.id === currentStepId)!;

    return (
        <Layout>
            <div className="mt-10 text-center flex flex-col items-center gap-3">
                <h1 className="text-4xl font-bold text-text-blue">Tabular Data Synthesis Process</h1>
                <p>Answer the questions below about your data to find the best TDS tool for you.</p>
            </div>
            <div className="w-full min-w-3xl max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg my-5">
                {!finished ? (
                    <div className="flex items-center flex-col">
                        <p className="text-lg font-semibold text-gray-700 mb-4 text-center">{currentStep.question}</p>

                        <div className="grid gap-3 sm:grid-cols-1">
                            {currentStep.options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleAnswer(currentStep.id, opt.value)}
                                className="w-full px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                            >
                                {opt.label}
                            </button>
                            ))}
                        </div>

                        <button onClick={restart} className="my-5 px-4 py-2 bg-gray-200 rounded-lg">
                            Restart
                        </button>
                    </div>
                ) : (
                    //resultados
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-800">Tool(s) Recommended</h2>

                        <ul className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
                            {getRecommendations(answers).map((r) => (
                                <li key={r} className="p-4 border rounded-2xl">
                                    <div>
                                        <p className="font-semibold text-lg">{r}</p>
                                        <p className="text-sm text-gray-600">Recommended based on your answers.</p>
                                    </div>

                                    {/* Radar chart */}
                                    <RadarChartComponent 
                                        toolName={r}
                                        data={toolCharacteristics[r]} 
                                    />

                                    {/* Download button */}
                                    <a
                                        href={getFiles(r)}
                                        download
                                        className="mt-3 block text-center px-3 py-2 bg-green-600 text-white rounded-lg"
                                    >
                                        Download {r}.zip
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button onClick={restart} className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-800">
                            Hacer otra evaluación
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
