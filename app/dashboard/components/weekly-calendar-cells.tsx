import React, { useState } from "react";

import { startOfWeek, addDays, format } from "date-fns";

import { EmployeeTypeWithShifts } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { Shift } from "@prisma/client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import AddShiftModal from "@/components/modals/add-shift-modal";

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeTypeWithShifts[];
}

const WeeklyCalendarCells: React.FC<WeeklyCalendarCellProps> = ({
  currentMonth,
  employees,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

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
        date={selectedDate}
        employeeId={selectedEmployee}
        shift={selectedShift}
      />
      <div className="border-slate-400 border-t border-l bg-white">
        {employees.map((employee: EmployeeTypeWithShifts, index: number) => (
          <div className="grid grid-cols-8" key={employee.id}>
            <div
              className={cn(
                "h-20 flex justify-center items-center border-r border-b  border-slate-400 text-sm",
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
                          <div key={shift.id} className="text-center text-sm">
                            <div>{shift.department}</div>
                            <div>{shift.shiftTime}</div>
                          </div>
                        ))}
                    </div>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => {
                        const selectedShift = employee.shifts.find(
                          (shift) =>
                            format(new Date(shift.date), dateFormat) === date
                        );
                        setSelectedShift(selectedShift || null);
                        setOpen(true);
                        setSelectedDate(addDays(startDate, i));
                        setSelectedEmployee(employee.id);
                      }}
                    >
                      {employee.shifts.some(
                        (shift) =>
                          format(new Date(shift.date), dateFormat) === date
                      )
                        ? "Edit"
                        : "Add"}
                    </ContextMenuItem>
                    <ContextMenuItem>Copy</ContextMenuItem>
                    <ContextMenuItem>Delete</ContextMenuItem>
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
