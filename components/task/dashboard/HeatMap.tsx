"use client";

import dayjs from "dayjs";

interface Props {
  activityByDate: Record<string, number>;
}

const ActivityHeatmap = ({
  activityByDate,
}: Props) => {
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const date = dayjs()
      .subtract(i, "day")
      .format("YYYY-MM-DD");

    days.push({
      date,
      value: activityByDate[date] || 0,
    });
  }

  return (
    <div className="bg-black border border-white/10 p-6 rounded-2xl">
      <h3 className="mb-4 text-lg font-semibold">
        30 Day Activity
      </h3>

      <div className="grid grid-cols-10 gap-2">
        {days.map((day) => (
          <div
            key={day.date}
            className={`h-8 w-8 rounded ${
              day.value === 0
                ? "bg-white/10"
                : day.value < 3
                ? "bg-cyan-400"
                : "bg-cyan-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityHeatmap;