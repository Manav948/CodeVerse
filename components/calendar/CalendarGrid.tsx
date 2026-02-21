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
      <div className="grid grid-cols-7 text-xs font-semibold text-muted-foreground">
        {DAYS.map((d) => (
          <div key={d} className="py-2 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border border-white/10 rounded-md overflow-hidden">
        {currMonth.flat().map((day) => (
          <Day
            key={day.format("YYYY-MM-DD")} 
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