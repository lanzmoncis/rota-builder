"use client";

import { useState } from "react";
import { format, getWeek, addWeeks, subWeeks } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, RotateCcw } from "lucide-react";

import { SendBatchEmail } from "@/actions/send-batch-email";

import { EmployeeWithShift } from "@/types/types";

import WeeklyCalendarHeader from "./weekly-calendar-header";
import WeeklyCalendarCells from "./weekly-calendar-cells";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

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
      <div className="flex items-center gap-4 pt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"ghost"} size="sm">
              <span className="text-[16px] leading-4 text-gray-700 font-medium">
                {format(new Date(), "MMMM d yyyy")}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={goToToday}
            className="w-6"
          >
            <RotateCcw strokeWidth={1.75} size={18} />
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
