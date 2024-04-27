"use client";

import { useState } from "react";
import { getWeek, addWeeks, subWeeks } from "date-fns";

import { SendBatchEmail } from "@/actions/send-batch-email";

import { EmployeeWithShift } from "@/types/types";

import { WeeklyCalendarHeader } from "./weekly-calendar-header";
import { WeeklyCalendarCells } from "./weekly-calendar-cells";
import { WeeklyCalendarMenu } from "./weekly-calendar-menu";

interface WeeklyCalendarProps {
  employees: EmployeeWithShift[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ employees }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSendEmails = async () => {
    await SendBatchEmail({ employees });
  };

  const changeWeekHandle = (btnType: "prev" | "next") => {
    if (btnType === "prev") {
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
      setSelectedDate(new Date());
    }
    if (btnType === "next") {
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
      setSelectedDate(new Date());
    }
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setCurrentWeek(getWeek(new Date()));
    setSelectedDate(new Date());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setCurrentMonth(new Date(date));
      setCurrentWeek(getWeek(date));
    }
  };

  return (
    <div className=" text-gray-700 flex flex-col px-4">
      <WeeklyCalendarMenu
        selectedDate={selectedDate}
        handleDateSelect={handleDateSelect}
        goToToday={goToToday}
        changeWeekHandle={changeWeekHandle}
      />
      <div className="p-8">
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
