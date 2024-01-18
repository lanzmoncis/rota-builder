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

import AddShiftModal from "@/components/add-shift-modal";
import WeeklyCalendarHeader from "@/components/weekly-calendar-header";
import WeeklyCalendarCells from "@/components/weekly-calendar-cells";

const WeeklyCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(true);

  const employees = [
    { name: "Lance", id: 1234 },
    { name: "Mark", id: 5678 },
    { name: "Jords", id: 9101 },
    { name: "Wako", id: 2345 },
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

  // const renderHeader = () => {
  //   let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  //   const dateFormat = "EEE. MMM. dd";
  //   const days = [];

  //   for (let i = 0; i < 7; i++) {
  //     const currentDate = addDays(startDate, i);
  //     days.push(
  //       <div
  //         key={i}
  //         className={cn(
  //           "text-sm w-full h-full flex items-center justify-center",
  //           isSameDay(currentDate, new Date()) ? "bg-green-100" : ""
  //         )}
  //       >
  //         {format(currentDate, dateFormat)}
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="grid grid-cols-8 justify-items-center items-center h-20">
  //       <div className="text-gray-50">hidden</div>
  //       {days}
  //     </div>
  //   );
  // };

  // const renderCells = () => {
  //   let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  //   const dateFormat = "EEE. MMM. dd";
  //   const days: JSX.Element[] = [];

  //   for (let i = 0; i < 7; i++) {
  //     const currentDate = addDays(startDate, i);
  //     days.push(
  //       <ContextMenu>
  //         <ContextMenuTrigger>
  //           <div className="h-20 border-r border-b border-slate-400 flex justify-center items-center">
  //             {format(currentDate, dateFormat)}
  //           </div>
  //         </ContextMenuTrigger>
  //         <ContextMenuContent>
  //           <ContextMenuItem onClick={() => setOpen(true)}>Add</ContextMenuItem>
  //           <ContextMenuItem>Edit</ContextMenuItem>
  //           <ContextMenuItem>Copy</ContextMenuItem>
  //         </ContextMenuContent>
  //       </ContextMenu>
  //     );
  //   }

  //   const cells = employees.map((employee, index) => (
  //     <div className="grid grid-cols-8" key={employee.id}>
  //       <div
  //         className={cn(
  //           "h-20 flex justify-center items-center border-r border-b border-slate-400",
  //           index % 2 === 0 ? "bg-green-300" : "bg-green-200"
  //         )}
  //       >
  //         {employee.name}
  //       </div>
  //       {days}
  //     </div>
  //   ));

  //   return (
  //     <div className="border-slate-400 border-t border-l bg-white">{cells}</div>
  //   );
  // };

  return (
    <>
      <AddShiftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={() => {}}
        loading={loading}
      />
      <div className="p-8 font-medium text-gray-700">
        <div className="flex justify-between">
          <div className="text-xl text-black">
            {format(new Date(), "MMMM d yyyy")}
          </div>
          <div className="flex gap-2 mb-10 text-sm bg-white py-1 px-2 rounded-sm">
            {/* Change design? */}
            <button
              onClick={goToToday}
              // should be dynamic and corresponds with the today time
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
        <WeeklyCalendarCells
          currentMonth={currentMonth}
          employees={employees}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default WeeklyCalendar;
