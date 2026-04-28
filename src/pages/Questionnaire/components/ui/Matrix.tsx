
interface MatrixDisplayProps {
    label: string;
    rowLabels: string[];
    colLabels: string[];
    matrix: number[][];
}

export default function MatrixDisplay({
    label,
    rowLabels,
    colLabels,
    matrix,
}: MatrixDisplayProps) {

    return (
        <div className="mt-1">
            <div className="mt-2 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="min-w-full text-xs">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="px-3 py-2 text-left font-semibold text-gray-500">
                                {label}
                            </th>
                            {colLabels.map((col) => (
                                <th
                                    key={col}
                                    className="px-2 py-2 text-center font-semibold text-gray-500"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row, rowIdx) => (
                            <tr
                                key={rowLabels[rowIdx]}
                                className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                            >
                                <td className="px-3 py-2 font-medium text-gray-700">
                                    {rowLabels[rowIdx]}
                                </td>
                                {row.map((val, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className={`px-2 py-2 text-center tabular-nums font-semibold ${
                                            val === 0
                                                ? "text-gray-300"
                                                : "text-amber-600"
                                        }`}
                                    >
                                        {val}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}