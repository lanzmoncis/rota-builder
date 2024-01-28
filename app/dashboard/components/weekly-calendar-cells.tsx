import React, { useState } from "react";

import { startOfWeek, addDays, format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import AddShiftModal from "@/components/modals/add-shift-modal";

interface Shift {
  date: string;
  department: string;
  shiftTime: string;
}

interface EmployeeProps {
  name: string;
  id: number;
  shifts: Shift[];
}

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeProps[];
}

// Still needs fixing

const WeeklyCalendarCells: React.FC<WeeklyCalendarCellProps> = ({
  currentMonth,
  employees,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const dateFormat = "EEE. MMM. dd, yyyy";
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
        loading={loading}
        date={selectedDate}
        employee={selectedEmployee}
        employees={employees}
      />
      <div className="border-slate-400 border-t border-l bg-white">
        {employees.map((employee, index) => (
          <div className="grid grid-cols-8" key={employee.id}>
            <div
              className={cn(
                "h-20 flex justify-center items-center border-r border-b border-slate-400 text-sm",
                index % 2 === 0 ? "bg-green-300" : "bg-green-200"
              )}
            >
              {employee.name}
            </div>
            {shiftDates.map((date, i) => (
              <React.Fragment key={i}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <div className="h-20 border-r border-b border-slate-400 flex justify-center items-center">
                      {employee.shifts
                        .filter((shift) => {
                          const formattedShiftDate = format(
                            new Date(shift.date),
                            dateFormat
                          );
                          return formattedShiftDate === date;
                        })
                        .map((shift) => (
                          <div key={shift.date} className="text-center text-sm">
                            <div>{shift.department}</div>
                            <div>{shift.shiftTime}</div>
                          </div>
                        ))}
                    </div>
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
