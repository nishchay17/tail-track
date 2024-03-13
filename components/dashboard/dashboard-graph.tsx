"use client";

import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  Tooltip,
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
      <div className="bg-zinc-800 px-2 py-3 rounded-lg border border-white/10">
        <p>{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function DashboardGraph({
  chartData,
  className,
}: {
  chartData: {
    date: number | string;
    count: number | string | null;
  }[];
  className: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        data={chartData}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Bar dataKey="count" fill="#8b5cf6" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DashboardGraph;
