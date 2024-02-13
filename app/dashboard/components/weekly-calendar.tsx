"use client";

import { useState } from "react";
import { format, getWeek, addWeeks, subWeeks } from "date-fns";

import { EmployeeTypeWithShifts } from "@/lib/actions";

import WeeklyCalendarHeader from "./weekly-calendar-header";
import WeeklyCalendarCells from "./weekly-calendar-cells";

interface WeeklyCalendarProps {
  employees: EmployeeTypeWithShifts[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ employees }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

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

  return (
    <div className="p-8 text-gray-700">
      <div className="flex justify-between">
        <div className="text-xl text-black">
          {format(new Date(), "MMMM d yyyy")}
        </div>
        <div className="flex gap-2 mb-10 text-sm bg-white py-1 px-2 rounded-sm">
          <button
            onClick={goToToday}
            className="bg-green-400 hover:bg-green-500 duration-200 py-1 px-2 rounded-sm"
          >
            Today
          </button>
          <button
            onClick={() => changeWeekHandle("prev")}
            className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-sm duration-200"
          >
            Previous week
          </button>
          <button
            onClick={() => changeWeekHandle("next")}
            className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-sm duration-200"
          >
            Next week
          </button>
        </div>
      </div>
      <WeeklyCalendarHeader currentMonth={currentMonth} />
      <WeeklyCalendarCells currentMonth={currentMonth} employees={employees} />
    </div>
  );
};

export default WeeklyCalendar;
