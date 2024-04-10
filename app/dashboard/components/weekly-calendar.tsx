"use client";

import { useState } from "react";
import { format, getWeek, addWeeks, subWeeks } from "date-fns";

import { SendBatchEmail } from "@/actions/send-batch-email";

import { EmployeeWithShift } from "@/types/types";

import WeeklyCalendarHeader from "./weekly-calendar-header";
import WeeklyCalendarCells from "./weekly-calendar-cells";

import { Button } from "@/components/ui/button";

interface WeeklyCalendarProps {
  employees: EmployeeWithShift[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ employees }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));

  const handleSendEmails = async () => {
    await SendBatchEmail({ employees });
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

  return (
    <div className="p-8 text-gray-700">
      <div className="flex justify-between">
        <div className="text-xl text-black">
          {format(new Date(), "MMMM d yyyy")}
        </div>
        <div className="flex gap-2 mb-10 text-sm bg-white py-1 px-1 rounded-sm shadow-sm">
          <Button
            size="sm"
            onClick={goToToday}
            className="bg-green-400 hover:bg-green-500 duration-200 py-1 px-2 rounded-sm text-white"
          >
            Today
          </Button>
          <Button
            size="sm"
            onClick={() => changeWeekHandle("prev")}
            className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-sm duration-200 text-white"
          >
            Previous week
          </Button>
          <Button
            size="sm"
            onClick={() => changeWeekHandle("next")}
            className="bg-green-400 hover:bg-green-500 py-1 px-2 rounded-sm duration-200 text-white"
          >
            Next week
          </Button>
        </div>
      </div>
      <div className="px-10 pt-5 pb-10 bg-white shadow-sm rounded-md">
        <WeeklyCalendarHeader currentMonth={currentMonth} />
        <WeeklyCalendarCells
          currentMonth={currentMonth}
          employees={employees}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
