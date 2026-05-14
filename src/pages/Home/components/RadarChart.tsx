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

const MAX_VALUE = 11;

export default function RadarChartComponent({ data, toolName }: RadarProps) {
  const chartData = data.map((d) => ({
    ...d,
    displayValue: MAX_VALUE - d.value,
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <RadarChart data={chartData} startAngle={90} endAngle={-270}>
          <PolarGrid gridType="circle" />

          <PolarAngleAxis dataKey="label" />

          <PolarRadiusAxis
            angle={90}
            domain={[0, MAX_VALUE]}
            tickCount={6}
            tickFormatter={(value) => String(MAX_VALUE - Number(value))}
            tick={{ fontSize: 10 }}
          />

          <Tooltip
            formatter={(_, __, props) => [
              Number(props.payload.value).toFixed(2),
              toolName,
            ]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "13px",
            }}
          />

          <Radar
            name={toolName}
            dataKey="displayValue"
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