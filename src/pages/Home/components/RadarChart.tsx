import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface RadarProps {
  data: { label: string; value: number }[];
  toolName: string;
}

function getDynamicDomain(data: { value: number }[]): { max: number; ticks: number[] } {
  const rawMax = Math.max(...data.map(d => d.value));
  // Redondea al siguiente múltiplo de 2 para ticks limpios
  const max = Math.ceil(rawMax / 2) * 2;
  const step = max / 5;
  const ticks = Array.from({ length: 6 }, (_, i) => Math.round(i * step * 10) / 10);
  return { max, ticks };
}

export default function RadarChartComponent({ data, toolName }: RadarProps) {
  const { max, ticks } = getDynamicDomain(data);

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <RadarChart data={data} startAngle={90} endAngle={-270}>
          <PolarGrid gridType="circle" />

          <PolarAngleAxis dataKey="label" />

          <PolarRadiusAxis
            angle={90}
            domain={[0, max]}
            ticks={ticks as any}
            tick={{ fontSize: 10 }}
          />

          <Tooltip
            formatter={(value: number) => [value.toFixed(2), toolName]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />

          <Radar
            name={toolName}
            dataKey="value"
            stroke="#3A7F8F"
            fill="#3A7F8F"
            fillOpacity={0.6}
            dot={{ r: 4, fill: "#3A7F8F", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#3A7F8F", stroke: "white", strokeWidth: 2 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}