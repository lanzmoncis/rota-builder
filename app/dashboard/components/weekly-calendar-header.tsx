"use client";

import { startOfWeek, addDays, isSameDay, format } from "date-fns";

import { cn } from "@/lib/utils";

import { dateFormatNoYear } from "@/constants/date-format";

interface WeeklyCalendarHeaderProps {
  currentMonth: Date;
}

const WeeklyCalendarHeader: React.FC<WeeklyCalendarHeaderProps> = ({
  currentMonth,
}) => {
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const headerDates = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    headerDates.push(
      <div
        key={i}
        className={cn(
          "text-sm w-full h-full flex items-center justify-center",
          isSameDay(currentDate, new Date()) && "bg-green-100"
        )}
      >
        {format(currentDate, dateFormatNoYear)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-8 justify-items-center items-center h-20">
      <div className="text-gray-50"></div>
      {headerDates}
    </div>
  );
};

export default WeeklyCalendarHeader;
