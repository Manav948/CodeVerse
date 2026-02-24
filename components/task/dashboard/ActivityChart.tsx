"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: number[];
}

const ActivityChart = ({ data }: Props) => {
  const chartData = data.map((value, index) => ({
    day: index + 1,
    completions: value,
  }));

  return (
    <div className="bg-black border border-white/10 p-6 rounded-2xl">
      <h3 className="mb-4 text-lg font-semibold">
        Last 7 Days Activity
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completions"
            stroke="#22d3ee"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;