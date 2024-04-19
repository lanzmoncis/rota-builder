"use client";

import { useState } from "react";
import { format, getWeek, addWeeks, subWeeks } from "date-fns";

import { ChevronLeft, ChevronRight, Plus, RotateCcw } from "lucide-react";

import { SendBatchEmail } from "@/actions/send-batch-email";

import { EmployeeWithShift } from "@/types/types";

import { Button } from "@/components/ui/button";

import WeeklyCalendarHeader from "./weekly-calendar-header";
import WeeklyCalendarCells from "./weekly-calendar-cells";

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
    <div className=" text-gray-700 flex flex-col px-4">
      <div className="flex items-center gap-4 pt-2">
        <div className="text-[16px] leading-4 text-gray-700">
          {format(new Date(), "MMMM d yyyy")}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={goToToday}
            className="w-6"
          >
            <RotateCcw strokeWidth={1.5} size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => changeWeekHandle("prev")}
            className="w-6"
          >
            <ChevronLeft strokeWidth={1.25} size={24} />
          </Button>
          <Button
            size="icon"
            onClick={() => changeWeekHandle("next")}
            variant="ghost"
            className="w-6"
          >
            <ChevronRight strokeWidth={1.25} size={24} />
          </Button>
          <Button variant="outline" className="h-[30px] px-2">
            <Plus className="mr-1" strokeWidth={1.75} size={16} />
            <span className="text-xs leading-4 text-gray-700">Publish</span>
          </Button>
        </div>
      </div>
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
