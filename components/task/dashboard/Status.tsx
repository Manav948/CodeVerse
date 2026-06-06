"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    completedTask: number;
    pendingTask: number;
    inProgress: number;
  };
}

const StatusDonut = ({ data }: Props) => {
  const chartData = [
    { name: "Completed", value: data.completedTask },
    { name: "In Progress", value: data.inProgress },
    { name: "Pending", value: data.pendingTask },
  ];


  const COLORS = [
    "#ef4444", 
    "#fca5a5", 
    "rgba(255, 255, 255, 0.08)",
  ];

  const total =
    data.completedTask +
    data.pendingTask +
    data.inProgress;

  const completionRate =
    total === 0
      ? 0
      : Math.round((data.completedTask / total) * 100);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111111] border border-white/5 px-3 py-2 rounded-lg shadow-xl shadow-black/80">
          <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
            {payload[0].name}
          </p>
          <p className="text-xs font-semibold text-white/90 mt-0.5">
            {payload[0].value} {payload[0].value === 1 ? "task" : "tasks"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 rounded-xl shadow-sm space-y-6">
      <div>
        <h3 className="text-sm font-medium text-white/90 tracking-tight">
          Task Distribution
        </h3>
        <p className="text-xs text-white/45 mt-0.5">
          Breakdown of your task statuses
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={62}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
                animationDuration={600}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                    className="outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-semibold text-white/90 leading-tight">
              {completionRate}%
            </span>
            <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-0.5">
              DONE
            </span>
          </div>
        </div>

        
        <div className="flex-1 space-y-4 w-full">
          {chartData.map((item, index) => {
            const percent =
              total === 0
                ? 0
                : Math.round((item.value / total) * 100);

            return (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-white/70 font-medium">{item.name}</span>
                  </div>
                  <span className="text-white/40 font-mono text-[11px]">
                    {item.value} ({percent}%)
                  </span>
                </div>

                <div className="w-full h-1 bg-white/3 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: COLORS[index],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusDonut;