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
    if (value === 0) return "bg-white/[0.02] border border-white/[0.03]";
    if (value < 2) return "bg-red-950/20 border border-red-500/10";
    if (value < 4) return "bg-red-900/35 border border-red-500/20";
    if (value < 6) return "bg-[#ef4444]/60 border border-red-400/30";
    return "bg-[#ef4444] border border-red-300/40 shadow-[0_0_6px_rgba(239,68,68,0.3)]";
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
          className="overflow-x-auto scrollbar-none pb-2 pt-1 flex flex-col cursor-grab active:cursor-grabbing select-none"
        >
         
          <div className="flex ml-8 mb-2 text-[10px] font-mono text-white/30 relative h-4 min-w-max">
            {weeks.map((_, i) => {
              const month = monthLabels.find((m) => m.index === i);
              return (
                <div key={i} className="w-3.5 shrink-0 text-left">
                  {month ? month.month : ""}
                </div>
              );
            })}
          </div>

          <div className="flex min-w-max">
          
            <div className="flex flex-col justify-between mr-2.5 text-[9px] font-mono text-white/30 py-0.5 h-[94px]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

          
            <div className="flex gap-[3.5px]">
              {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-[3.5px] shrink-0">
                  {week.map((day, j) => (
                    <div
                      key={j}
                      title={`${day.date} — ${day.value} completions`}
                      className={`w-2.5 h-2.5 rounded-[1.5px] transition-colors duration-200 ${getColor(
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

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-white/[0.04] text-[11px] text-white/40">
        <span className="font-mono text-[10px]">Contributions reflect completed tasks</span>

        <div className="flex items-center gap-1.5 self-end">
          <span className="text-[10px] font-mono">Less</span>
          <div className="w-2.5 h-2.5 bg-white/[0.02] border border-white/[0.03] rounded-[1.5px]" />
          <div className="w-2.5 h-2.5 bg-red-950/20 border border-red-500/10 rounded-[1.5px]" />
          <div className="w-2.5 h-2.5 bg-red-900/35 border border-red-500/20 rounded-[1.5px]" />
          <div className="w-2.5 h-2.5 bg-[#ef4444]/60 border border-red-400/30 rounded-[1.5px]" />
          <div className="w-2.5 h-2.5 bg-[#ef4444] border border-red-300/40 rounded-[1.5px]" />
          <span className="text-[10px] font-mono">More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;