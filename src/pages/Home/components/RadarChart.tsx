import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from "recharts";

interface RadarProps {
    data: { label: string; value: number }[];
    toolName: string;
}

export default function RadarChartComponent({ data, toolName }: RadarProps) {
    return (
        <div className="w-full h-64">
        <ResponsiveContainer>
            <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                <Radar
                    name={toolName}
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                />
            </RadarChart>
        </ResponsiveContainer>
        </div>
    );
}
