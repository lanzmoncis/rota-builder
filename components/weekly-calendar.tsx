"use client";

import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";

import { cn } from "@/lib/utils";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<number>(getWeek(currentMonth));

  const changeMonthHandle = (btnType: "prev" | "next") => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType: "prev" | "next") => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setCurrentWeek(getWeek(new Date()));
  };

  const renderHeader = () => {
    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    const dateFormat = "EEE. MMM. dd";
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = addDays(startDate, i);
      days.push(
        <div
          key={i}
          className={cn(
            "p-5 text-sm",
            isSameDay(currentDate, new Date()) ? "bg-sky-500 text-slate-50" : ""
          )}
        >
          {format(currentDate, dateFormat)}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-5 justify-items-center">{days}</div>
    );
  };

  return (
    <div className="calendar">
      <div className="flex gap-5 mb-10 text-sm">
        <button onClick={() => changeWeekHandle("prev")}>Previous Week</button>
        <button onClick={goToToday}>Today</button>
        <button onClick={() => changeWeekHandle("next")}>Next Week</button>
      </div>
      {renderHeader()}
    </div>
  );
};

export default Calendar;
