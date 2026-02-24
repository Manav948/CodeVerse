"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: any;
}

const StatusDonut = ({ data }: Props) => {
  const chartData = [
    {
      name: "Completed",
      value: data.completedTasks,
    },
    {
      name: "Pending",
      value: data.pendingTasks,
    },
    {
      name: "In Progress",
      value: data.inProgressTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#3b82f6",
  ];

  return (
    <div className="bg-black border border-white/10 p-6 rounded-2xl">
      <h3 className="mb-4 text-lg font-semibold">
        Task Distribution
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            innerRadius={60}
            outerRadius={90}
          >
            {chartData.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusDonut;