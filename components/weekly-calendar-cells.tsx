import React, { useState } from "react";

import { startOfWeek, addDays, format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import AddShiftModal from "@/components/add-shift-modal";

type EmployeeProps = {
  name: string;
  id: number;
};

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeProps[];
}

const WeeklyCalendarCells = ({
  currentMonth,
  employees,
}: WeeklyCalendarCellProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const dateFormat = "EEE. MMM. dd";
  const shiftDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    shiftDates.push(format(currentDate, dateFormat));
  }

  return (
    <>
      <AddShiftModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={() => {}}
        loading={loading}
        date={selectedDate}
        employee={selectedEmployee}
      />
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
            {shiftDates.map((date, i) => (
              <React.Fragment key={i}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="h-20 border-r border-b border-slate-400 flex justify-center items-center"></div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => {
                        setOpen(true);
                        setSelectedDate(addDays(startDate, i));
                        setSelectedEmployee(employee.name);
                      }}
                    >
                      Add
                    </ContextMenuItem>
                    <ContextMenuItem>Edit</ContextMenuItem>
                    <ContextMenuItem>Copy</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default WeeklyCalendarCells;
