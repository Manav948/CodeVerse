"use client";

import dayjs from "dayjs";

interface Props {
  activityByDate: Record<string, number>;
}

const ActivityHeatmap = ({ activityByDate }: Props) => {
  const today = dayjs();
  const startOfYear = today.startOf("year");
  const endOfYear = today.endOf("year");

  const startDate = startOfYear.startOf("week");
  const endDate = endOfYear.endOf("week");

  const days: {
    date: string;
    value: number;
    month: string;
  }[] = [];

  let current = startDate;

  while (current.isBefore(endDate)) {
    const formatted = current.format("YYYY-MM-DD");

    days.push({
      date: formatted,
      value: activityByDate[formatted] || 0,
      month: current.format("MMM"),
    });

    current = current.add(1, "day");
  }

  const weeks: typeof days[] = [];
  let week: typeof days = [];

  days.forEach((day, index) => {
    week.push(day);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  const getColor = (value: number) => {
    if (value === 0) return "bg-[#161b22]";
    if (value < 2) return "bg-[#0e4429]";
    if (value < 4) return "bg-[#006d32]";
    if (value < 6) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  // Month labels
  const monthLabels: { month: string; index: number }[] = [];
  let lastMonth = "";

  weeks.forEach((week, i) => {
    const firstDay = week[0];
    if (firstDay.month !== lastMonth) {
      monthLabels.push({
        month: firstDay.month,
        index: i,
      });
      lastMonth = firstDay.month;
    }
  });

  return (
    <div className="bg-black p-6 rounded-lg text-sm"> 
      <div className="flex ml-10 mb-3 text-xs text-gray-400">
        {weeks.map((_, i) => {
          const month = monthLabels.find(m => m.index === i);
          return (
            <div key={i} className="w-4 text-left">
              {month ? month.month : ""}
            </div>
          );
        })}
      </div>

      <div className="flex">
        <div className="flex flex-col justify-between mr-3 text-xs text-gray-400">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {week.map((day, j) => (
                <div
                  key={j}
                  title={`${day.date} — ${day.value} contributions`}
                  className={`w-3 h-3 ${getColor(
                    day.value
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
        <span>Learn how we count contributions</span>

        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-3 h-3 bg-[#161b22] rounded-sm" />
          <div className="w-3 h-3 bg-[#0e4429] rounded-sm" />
          <div className="w-3 h-3 bg-[#006d32] rounded-sm" />
          <div className="w-3 h-3 bg-[#26a641] rounded-sm" />
          <div className="w-3 h-3 bg-[#39d353] rounded-sm" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;