"use client";

import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMonth } from "@/lib/utils";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import { CalendarItem } from "@/types/extended";
import Loader from "../ui/Loading";
import { ActiveSection } from "../task/sidebar/SidebarContainer";
import Sidebar from "../task/sidebar/Sidebar";
import { Separator } from "../ui/separator";

const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [active, setActive] = useState<ActiveSection>("tasks");

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
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="w-full min-h-screen flex bg-black text-white">
      <aside className="hidden md:block border-r border-white/10">
        <Sidebar active={active} setActive={setActive} />
      </aside>
      <main className="flex-1 px-6 py-8 space-y-6">
        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-20 text-red-500">
            Failed to load calendar.
          </div>
        )}

        {!isLoading && !isError && (
          <>
            <CalendarHeader
              monthIndex={monthIndex}
              onChangeMonthHandler={(c) =>
                setMonthIndex((prev) =>
                  c === "next" ? prev + 1 : prev - 1
                )
              }
              onResetMonthHandler={() =>
                setMonthIndex(dayjs().month())
              }
            />
            <Separator className="bg-white/10" />
            <CalendarGrid
              currMonth={currMonth}
              monthIndex={monthIndex}
              calendarItems={data}
            />
          </>
        )}
      </main>
    </section>
  );
};

export default Calendar;