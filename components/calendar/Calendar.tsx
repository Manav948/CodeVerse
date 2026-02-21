"use client";

import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMonth } from "@/lib/utils";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { CalendarItem } from "@/types/extended";

const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());

  // ✅ Derived state → useMemo instead of useEffect + useState
  const currMonth = useMemo(() => {
    return getMonth(monthIndex);
  }, [monthIndex]);

  const { data = [], isLoading, isError } = useQuery<CalendarItem[]>({
    queryKey: ["calendarTasks"],
    queryFn: async () => {
      const res = await fetch("/api/calendar/get");
      if (!res.ok) throw new Error("Failed to fetch calendar data");
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-10 text-muted-foreground">
        Loading calendar...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex justify-center py-10 text-red-500">
        Failed to load calendar.
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col gap-6">
      <CalendarHeader
        monthIndex={monthIndex}
        onChangeMonthHandler={(c) =>
          setMonthIndex((prev) => (c === "next" ? prev + 1 : prev - 1))
        }
        onResetMonthHandler={() => setMonthIndex(dayjs().month())}
      />

      <CalendarGrid
        currMonth={currMonth}
        monthIndex={monthIndex}
        calendarItems={data}
      />
    </section>
  );
};

export default Calendar;