"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { startOfWeek, addDays, format } from "date-fns";
import { Briefcase } from "lucide-react";

import { deleteShift } from "@/actions/delete-shift";
import { AddTimeOff } from "@/actions/add-timeoff";

import { timeOffOptions } from "@/constants/timeoff-options";
import { dateFormatWithYear } from "@/constants/date-format";

import { cn } from "@/lib/utils";

import { EmployeeWithShift } from "@/types/types";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";

import { TimeOffMenuItem } from "./time-off-menu";
import { MenuTrigger } from "./menu-trigger";
import { AddEditMenu } from "./add-edit-menu";
import { DeleteMenu } from "./delete-menu";

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeWithShift[];
}

const WeeklyCalendarCells: React.FC<WeeklyCalendarCellProps> = ({
  currentMonth,
  employees,
}) => {
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shiftId, setShiftId] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const shiftDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    shiftDates.push(format(currentDate, dateFormatWithYear));
  }

  const handleTimeOff = async (
    value: string,
    employeeId: string,
    date: Date
  ) => {
    try {
      await AddTimeOff(value, employeeId, date);
      router.refresh();
      toast({ description: "Add time off" });
    } catch (error) {
      toast({ description: "Something went wrong" });
    }
  };

  const onDelete = async (shiftId: string) => {
    try {
      setLoading(true);
      await deleteShift(shiftId);
      router.refresh();
      toast({ description: "Shift deleted" });
    } catch (error) {
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      setOpen(false);
      setShiftId("");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(shiftId)}
        loading={loading}
      />
      <div className="border-slate-400 border-t border-l bg-white">
        {employees.map((employee: EmployeeWithShift, index: number) => (
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
                    <MenuTrigger employee={employee} date={date} />
                  </ContextMenuTrigger>
                  <ContextMenuContent className="bg-green-300">
                    {employee.shifts.some(
                      (shift) =>
                        format(new Date(shift.date), dateFormatWithYear) ===
                          date && shift.timeOff !== null
                    ) ? null : (
                      <AddEditMenu employee={employee} date={date} />
                    )}
                    {employee.shifts.some(
                      (shift) =>
                        format(new Date(shift.date), dateFormatWithYear) ===
                        date
                    ) && (
                      <DeleteMenu
                        employee={employee}
                        date={date}
                        setOpen={setOpen}
                        setShiftId={setShiftId}
                      />
                    )}
                    {employee.shifts.some(
                      (shift) =>
                        format(new Date(shift.date), dateFormatWithYear) ===
                        date
                    ) ? null : (
                      <>
                        <ContextMenuSub>
                          <ContextMenuSubTrigger>
                            <Briefcase className="w-4 h-4 mr-2" />
                            Time off
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-48 bg-green-300">
                            {timeOffOptions.map((option) => (
                              <TimeOffMenuItem
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                date={date}
                                employeeId={employee.id}
                                handleTimeOff={handleTimeOff}
                              />
                            ))}
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                        <ContextMenuSub>
                          <ContextMenuSubTrigger className="ml-6">
                            Other
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-48 bg-green-300">
                            <TimeOffMenuItem
                              label="On call"
                              value="On call"
                              date={date}
                              employeeId={employee.id}
                              handleTimeOff={handleTimeOff}
                            />
                          </ContextMenuSubContent>
                        </ContextMenuSub>
                      </>
                    )}
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
