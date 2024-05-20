"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getWeek, addWeeks, subWeeks } from "date-fns";

import { SendBatchEmail } from "@/actions/send-batch-email";

import { EmployeeWithShift } from "@/types/types";

import { WeeklyCalendarHeader } from "./weekly-calendar-header";
import { WeeklyCalendarCells } from "./weekly-calendar-cells";
import { WeeklyCalendarMenu } from "./weekly-calendar-menu";
import { Button } from "@/components/ui/button";

interface WeeklyCalendarProps {
  employees: EmployeeWithShift[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ employees }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());

  const router = useRouter();

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
        {employees.length > 0 ? (
          <WeeklyCalendarCells
            currentMonth={currentMonth}
            employees={employees}
          />
        ) : (
          <div className="w-full border border-slate-300 h-52 flex items-center justify-center text-[13px]/relaxed text-gray-700 rounded-sm">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p>No employees available.</p>
              <Button
                size={"sm"}
                className="text-[13px] bg-green-500"
                onClick={() => router.push(`/employees/new`)}
              >
                Add employee
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
