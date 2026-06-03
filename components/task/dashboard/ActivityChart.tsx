"use client";

import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import dayjs from "dayjs";

interface Props {
  data: number[];
}

const ActivityChart = ({ data }: Props) => {
  const chartData = data.map((value, index) => {

    const reverseIndex = 6 - index;
    const day = dayjs().subtract(reverseIndex, "day");
    return {
      name: day.format("ddd"),
      date: day.format("MMMM DD"),
      completions: data[reverseIndex] || 0,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111111] border border-white/5 px-3.5 py-2.5 rounded-lg shadow-xl shadow-black/80">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            {payload[0].payload.date}
          </p>
          <p className="text-xs font-semibold text-white/90 mt-1">
            {payload[0].value} {payload[0].value === 1 ? "task" : "tasks"} completed
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 rounded-xl shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/90 tracking-tight">
            Weekly Performance
          </h3>
          <p className="text-xs text-white/45 mt-0.5">
            Your task completion trend for the last 7 days
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
          <span>COMPLETIONS</span>
        </div>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.2)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
              fontFamily="monospace"
            />

            <YAxis
              stroke="rgba(255,255,255,0.2)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dx={-5}
              fontFamily="monospace"
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="completions"
              stroke="#ef4444"
              strokeWidth={1.5}
              fill="url(#chartGradient)"
              dot={{ r: 3, stroke: "#ef4444", strokeWidth: 1, fill: "#111111" }}
              activeDot={{ r: 5, stroke: "#ef4444", strokeWidth: 1, fill: "#ffffff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;