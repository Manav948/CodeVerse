import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getMonth(month: number) {
  const year = dayjs().year();

  const firstDayOfMonth = dayjs(
    new Date(year, month, 1)
  );

  const dayOfWeek =
    firstDayOfMonth.day() === 0
      ? 6
      : firstDayOfMonth.day() - 1;

  let currentDay = firstDayOfMonth.subtract(
    dayOfWeek,
    "day"
  );

  const monthMatrix = [];

  for (let week = 0; week < 6; week++) {
    const weekRow = [];

    for (let day = 0; day < 7; day++) {
      weekRow.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    monthMatrix.push(weekRow);
  }

  return monthMatrix;
}