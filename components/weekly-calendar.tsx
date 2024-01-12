"use client";

import { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";

import { cn } from "@/lib/utils";

import AddShiftModal from "@/components/add-shift-modal";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [currentWeek, setCurrentWeek] = useState<number>(getWeek(currentMonth));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const employees = [
    { name: "Lance", id: 123 },
    { name: "Mark", id: 456 },
  ];

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
            "text-sm",
            isSameDay(currentDate, new Date()) ? "bg-sky-500 text-slate-50" : ""
          )}
        >
          {format(currentDate, dateFormat)}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 justify-items-center items-center h-20">
        {days}
      </div>
    );
  };

  return (
    <>
      <AddShiftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={() => {}}
        loading={loading}
      />
      <div className="calendar">
        <div className="flex gap-5 mb-10 text-sm">
          <button onClick={() => changeWeekHandle("prev")}>
            Previous Week
          </button>
          <button onClick={goToToday}>Today</button>
          <button onClick={() => changeWeekHandle("next")}>Next Week</button>
        </div>
        <div className="mx-14">
          {renderHeader()}
          <div className="grid grid-cols-7">
            {employees.map((employee) => (
              <>
                {[...Array(7)].map((_, index) => (
                  <div
                    key={employee.id}
                    className={cn(
                      "border border-gray-700 h-20",
                      index === 6 ? "" : "border-r-0"
                    )}
                    onClick={() => setOpen(true)}
                  ></div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
