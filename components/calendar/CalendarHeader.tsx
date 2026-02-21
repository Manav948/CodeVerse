"use client";

import dayjs from "dayjs";
import { useFormatter } from "next-intl";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

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
          size="icon"
          variant="outline"
          onClick={() => onChangeMonthHandler("prev")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="secondary"
          onClick={onResetMonthHandler}
        >
          <RotateCcw className="mr-1 h-4 w-4" />
          Today
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={() => onChangeMonthHandler("next")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;