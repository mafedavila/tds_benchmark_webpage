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
        <RadarChart data={data} startAngle={90} endAngle={-270}>
          <PolarGrid gridType="circle" />

          <PolarAngleAxis dataKey="label" />

          <PolarRadiusAxis
            angle={90}
            domain={[11, 0]}
            ticks={[0, 2, 4, 6, 8, 10] as any}
            tickCount={6}
            allowDataOverflow
          />

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