"use client";

import React, { useRef, useEffect } from "react";
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

  days.forEach((day) => {
    week.push(day);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  const getColor = (value: number) => {
    if (value === 0) return "bg-white/[0.03] border border-white/[0.06]";
    if (value < 2) return "bg-emerald-500/20 border border-emerald-500/35";
    if (value < 4) return "bg-emerald-500/45 border border-emerald-500/50";
    if (value < 6) return "bg-emerald-500/70 border border-emerald-400/70";
    return "bg-[#10b981] border border-emerald-300/80 shadow-[0_0_8px_rgba(16,185,129,0.5)]";
  };

 
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

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="bg-[#111111] border border-white/5 p-5 sm:p-6 rounded-xl shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-white/90 tracking-tight">
            Activity Heatmap
          </h3>
          <p className="text-xs text-white/45 mt-0.5">
            Your task completion contribution graph over the year
          </p>
        </div>
      </div>

      <div className="relative">
        <div 
          ref={scrollRef} 
          className="overflow-x-auto scrollbar-none pb-2 pt-1 flex cursor-grab active:cursor-grabbing select-none"
        >
          <div className="mx-auto flex flex-col min-w-max">
            {/* Month Row */}
            <div className="flex mb-2 text-[10px] font-mono text-white/30 relative h-4">
              <div className="w-7.5 shrink-0" />
              <div className="flex gap-1">
                {weeks.map((_, i) => {
                  const month = monthLabels.find((m) => m.index === i);
                  return (
                    <div key={i} className="w-3 shrink-0 text-left overflow-visible whitespace-nowrap">
                      {month ? month.month : ""}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grid Row */}
            <div className="flex">
              <div className="flex flex-col justify-between mr-2 text-[9px] font-mono text-white/30 py-0.5 h-27 w-5.5 shrink-0">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex gap-1">
                {weeks.map((week, i) => (
                  <div key={i} className="flex flex-col gap-1 shrink-0">
                    {week.map((day, j) => (
                      <div
                        key={j}
                        title={`${day.date} — ${day.value} completions`}
                        className={`w-3 h-3 rounded-[2px] transition-colors duration-200 ${getColor(
                          day.value
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/4 text-[11px] text-white/40">
        <span className="font-mono text-[10px]">Contributions reflect completed tasks</span>

        <div className="flex items-center gap-1.5 self-end">
          <span className="text-[10px] font-mono">Less</span>
          <div className="w-3 h-3 bg-white/3 border border-white/6 rounded-[2px]" />
          <div className="w-3 h-3 bg-emerald-500/20 border border-emerald-500/35 rounded-[2px]" />
          <div className="w-3 h-3 bg-emerald-500/45 border border-emerald-500/50 rounded-[2px]" />
          <div className="w-3 h-3 bg-emerald-500/70 border border-emerald-400/70 rounded-[2px]" />
          <div className="w-3 h-3 bg-[#10b981] border border-emerald-300/80 rounded-[2px]" />
          <span className="text-[10px] font-mono">More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;