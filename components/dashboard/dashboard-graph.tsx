"use client";

import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 px-3 py-2 rounded-lg border border-white/10">
        <p className="text-sm border-b">{label}</p>
        {payload.map((it: any) => (
          <p key={it.name}>
            {it.name}: {it.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function DashboardGraph({
  chartData,
  className,
  lines,
}: {
  chartData: {
    [key: string]: number | string | null;
  }[];
  className: string;
  lines: string[];
}) {
  const _chartData = chartData.map((it) => {
    const filled = it;
    lines.forEach((it) => {
      if (!filled[it]) {
        filled[it] = 0;
      }
    });
    return filled;
  });
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <LineChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        data={_chartData}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

        {lines.map((it) => (
          <Line
            key={it}
            dataKey={it}
            stroke="#8b5cf6"
            type="monotone"
            strokeWidth={2}
            dot={{ display: "none" }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DashboardGraph;
