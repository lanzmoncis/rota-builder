import React from "react";

import { startOfWeek, addDays, format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type EmployeeProps = {
  name: string;
  id: number;
};

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeProps[];
  setOpen: (isOpen: boolean) => void;
}

const WeeklyCalendarCells = ({
  currentMonth,
  employees,
  setOpen,
}: WeeklyCalendarCellProps) => {
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const dateFormat = "EEE. MMM. dd";
  const shiftDates: JSX.Element[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    shiftDates.push(
      <React.Fragment key={i}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="h-20 border-r border-b border-slate-400 flex justify-center items-center">
              {format(currentDate, dateFormat)}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => setOpen(true)}>Add</ContextMenuItem>
            <ContextMenuItem>Edit</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </React.Fragment>
    );
  }

  return (
    <div className="border-slate-400 border-t border-l bg-white">
      {employees.map((employee, index) => (
        <div className="grid grid-cols-8" key={employee.id}>
          <div
            className={cn(
              "h-20 flex justify-center items-center border-r border-b border-slate-400",
              index % 2 === 0 ? "bg-green-300" : "bg-green-200"
            )}
          >
            {employee.name}
          </div>
          {shiftDates}
        </div>
      ))}
    </div>
  );
};

export default WeeklyCalendarCells;
