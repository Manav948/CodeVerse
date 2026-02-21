"use client";

import dayjs, { Dayjs } from "dayjs";
import { CalendarItem } from "@/types/extended";
import Day from "./Day";

interface Props {
  currMonth: Dayjs[][];
  monthIndex: number;
  calendarItems: CalendarItem[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarGrid = ({
  currMonth,
  monthIndex,
  calendarItems,
}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-xs font-semibold text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-2 text-center">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 border border-border rounded-xl overflow-hidden">
        {currMonth.flat().map((day) => (
          <Day
            key={day.format("YYYY-MM-DD")} // ✅ stable key
            day={day}
            monthIndex={monthIndex}
            calendarItems={calendarItems}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;