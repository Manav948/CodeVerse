"use client";

import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { CalendarItem } from "@/types/extended";
import { cn } from "@/lib/utils";

interface Props {
  day: Dayjs;
  monthIndex: number;
  calendarItems: CalendarItem[];
}

const Day = ({ day, monthIndex, calendarItems }: Props) => {
  const isToday = day.isSame(dayjs(), "day");
  const isCurrentMonth = day.month() === monthIndex;

  // ✅ Memoize filtered tasks for performance
  const tasksForDay = useMemo(() => {
    return calendarItems.filter(
      (task) =>
        task.dueDate &&
        dayjs(task.dueDate).isSame(day, "day")
    );
  }, [calendarItems, day]);

  return (
    <div
      className={cn(
        "min-h-[120px] p-2 border border-border transition-colors",
        !isCurrentMonth && "opacity-30 bg-muted/20",
        isToday && "bg-primary/5"
      )}
    >
      {/* Date number */}
      <div className="flex justify-end">
        <span
          className={cn(
            "text-sm font-medium px-2 py-0.5",
            isToday &&
              "bg-primary text-primary-foreground rounded-full"
          )}
        >
          {day.date()}
        </span>
      </div>

      {/* Tasks */}
      <div className="mt-2 space-y-1">
        {tasksForDay.map((task) => {
          const priorityColor =
            task.priority === "HIGH"
              ? "bg-red-600"
              : task.priority === "MEDIUM"
              ? "bg-yellow-500"
              : "bg-green-600";

          const completedStyle =
            task.status === "COMPLETED"
              ? "opacity-60 line-through"
              : "";

          return (
            <div
              key={task.id}
              className={cn(
                "px-2 py-1 rounded-md text-xs text-white truncate transition hover:opacity-90",
                priorityColor,
                completedStyle
              )}
            >
              {task.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Day;