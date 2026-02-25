"use client";

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
    { name: "Pending", value: data.pendingTask },
    { name: "In Progress", value: data.inProgress },
  ];

  const COLORS = [
    "url(#completedGradient)",
    "url(#pendingGradient)",
    "url(#progressGradient)",
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
        <div className="bg-[#111827] border border-white/10 px-4 py-2 rounded-lg shadow-xl">
          <p className="text-xs text-white/50">
            {payload[0].name}
          </p>
          <p className="text-sm font-semibold text-white">
            {payload[0].value} tasks
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-black border border-white/10 p-6 rounded-2xl">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">
          Task Distribution
        </h3>
        <p className="text-white/40 text-sm">
          Current workload breakdown
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="relative w-65 h-65">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>

                <linearGradient id="pendingGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#eab308" />
                </linearGradient>

                <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>

              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={3}
                animationDuration={800}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">
              {completionRate}%
            </span>
            <span className="text-xs text-white/40">
              Completion Rate
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-5 w-full">
          {chartData.map((item, index) => {
            const percent =
              total === 0
                ? 0
                : Math.round((item.value / total) * 100);

            return (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background:
                          index === 0
                            ? "#22c55e"
                            : index === 1
                            ? "#facc15"
                            : "#3b82f6",
                      }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-white/60">
                    {item.value} ({percent}%)
                  </span>
                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${percent}%`,
                      background:
                        index === 0
                          ? "linear-gradient(to right,#22c55e,#16a34a)"
                          : index === 1
                          ? "linear-gradient(to right,#facc15,#eab308)"
                          : "linear-gradient(to right,#3b82f6,#6366f1)",
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