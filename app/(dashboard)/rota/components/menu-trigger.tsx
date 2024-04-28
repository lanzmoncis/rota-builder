"use client";

import { format } from "date-fns";

import { EmployeeWithShift } from "@/types/types";

import { dateFormatWithYear } from "@/constants/date-format";
import { cn } from "@/lib/utils";

interface ContentMenuTriggerProps {
  employee: EmployeeWithShift;
  date: string;
}

export const MenuTrigger: React.FC<ContentMenuTriggerProps> = ({
  employee,
  date,
}) => {
  return (
    <div className="h-20 border-r border-b border-slate-300 flex justify-center items-center">
      {employee.shifts
        .filter((shift) => {
          const formattedShiftDate = format(
            new Date(shift.date),
            dateFormatWithYear
          );
          return formattedShiftDate === date;
        })
        .map((shift) => (
          <div
            key={shift.id}
            className={cn(
              "flex flex-col items-center justify-center text-[13px] leading-4",
              shift.timeOff === "OnCall" ? "bg-yellow-50 w-full h-full" : ""
            )}
          >
            {shift.timeOff ? (
              <div>
                {shift.timeOff === "SickLeave" ? (
                  <div>Sick leave</div>
                ) : shift.timeOff === "OnCall" ? (
                  <div>On call</div>
                ) : (
                  <div>{shift.timeOff}</div>
                )}
              </div>
            ) : (
              <>
                <div>{shift.department}</div>
                <div>{shift.shiftTime}</div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};
