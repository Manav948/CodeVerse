"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

interface Props {
  data: number[];
}

const ActivityChart = ({ data }: Props) => {
  const chartData = data.map((value, index) => ({
    name: `Day ${index + 1}`,
    completions: value,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111827] border border-white/10 px-4 py-2 rounded-lg shadow-xl">
          <p className="text-xs text-white/50">
            {payload[0].payload.name}
          </p>
          <p className="text-sm font-semibold text-white">
            {payload[0].value} tasks completed
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-black border border-white/15 p-6 rounded-2xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Weekly Performance
        </h3>
        <p className="text-white/40 text-sm">
          Task completion trend (last 7 days)
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>

            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.3)"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="rgba(255,255,255,0.3)"
            tickLine={false}
            axisLine={false}
            width={30}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="completions"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            fill="url(#areaGradient)"
            dot={{ r: 4, strokeWidth: 2, fill: "#0f172a" }}
            activeDot={{ r: 6 }}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;