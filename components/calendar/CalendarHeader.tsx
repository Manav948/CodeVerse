"use client";

import dayjs from "dayjs";
import { useFormatter } from "next-intl";
import { Button } from "../ui/button";
import { ArrowLeftCircle, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  monthIndex: number;
  onResetMonthHandler: () => void;
  onChangeMonthHandler: (change: "prev" | "next") => void;
}

const CalendarHeader = ({
  monthIndex,
  onChangeMonthHandler,
  onResetMonthHandler,
}: Props) => {
  const format = useFormatter();
  const date = dayjs().month(monthIndex).toDate();
  const router = useRouter();
  const onBackHandler = () => {
    router.push("/task/dashboard")
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        {format.dateTime(date, { month: "long" })}{" "}
        <span className="text-muted-foreground">
          {format.dateTime(date, { year: "numeric" })}
        </span>
      </h1>

      <div className="flex items-center gap-2">
        <Button
          onClick={onBackHandler}
          className="bg-red-500/60 text-white md:hidden">
          <ArrowLeftCircle size={16} />
          Back
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => onChangeMonthHandler("prev")}
        >
          <ChevronLeft className="h-4 w-4 text-black" />
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={onResetMonthHandler}
        >
          <RotateCcw className="mr-1 h-4 w-4 text-black" />
          Today
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={() => onChangeMonthHandler("next")}
        >
          <ChevronRight className="h-4 w-4 text-black" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;