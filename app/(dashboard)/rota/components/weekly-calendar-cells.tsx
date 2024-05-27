"use client";

import React, { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { Briefcase } from "lucide-react";

import { Shift } from "@prisma/client";

import { deleteShift } from "@/actions/delete-shift";
import { AddTimeOff } from "@/actions/add-timeoff";

import { timeOffOptions } from "@/constants/timeoff-options";
import { dateFormatWithYear } from "@/constants/date-format";

import { cn } from "@/lib/utils";

import { EmployeeWithShift } from "@/types/types";
import { TimeOffOption } from "@/types/types";

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
import { AddShiftModal } from "@/components/modals/add-shift-modal";

import { TimeOffMenuItem } from "./time-off-menu";
import { MenuTrigger } from "./menu-trigger";
import { AddEditMenu } from "./add-edit-menu";
import { DeleteMenu } from "./delete-menu";

interface WeeklyCalendarCellProps {
  currentMonth: Date;
  employees: EmployeeWithShift[];
}

export const WeeklyCalendarCells: React.FC<WeeklyCalendarCellProps> = ({
  currentMonth,
  employees,
}) => {
  let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

  const [open, setOpen] = useState(false);
  const [isFormModal, setIsFormModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shiftId, setShiftId] = useState("");
  const [shift, setShift] = useState<Shift | null>(null);

  const { toast } = useToast();

  const shiftDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    shiftDates.push(format(currentDate, dateFormatWithYear));
  }

  const handleTimeOff = async (
    value: TimeOffOption,
    employeeId: string,
    date: Date
  ) => {
    try {
      await AddTimeOff(value, employeeId, date);
      toast({ description: "Add time off" });
    } catch (error) {
      toast({ description: "Something went wrong" });
    }
  };

  const onDelete = async (shiftId: string) => {
    try {
      setLoading(true);
      await deleteShift(shiftId);
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
      <AddShiftModal
        isFormModal={isFormModal}
        setIsFormModal={setIsFormModal}
        shift={shift}
        setShift={setShift}
      />
      <div className="border-slate-300 border-t border-l bg-white">
        {employees.map((employee: EmployeeWithShift, index: number) => (
          <div className="grid grid-cols-8" key={employee.id}>
            <div
              className={cn(
                "flex justify-end px-6 items-center border-r border-b  border-slate-300 text-[13px] leading-4",
                index % 2 === 0 ? "bg-green-400" : "bg-green-300"
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
                      <AddEditMenu
                        employee={employee}
                        date={date}
                        setIsFormModal={setIsFormModal}
                        setShift={setShift}
                      />
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
                          <ContextMenuSubTrigger className=" text-gray-700 text-[13.5px] leading-4">
                            <Briefcase
                              className="w-4 h-4 mr-2"
                              color={"#374151"}
                            />
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
                          <ContextMenuSubTrigger className="ml-6 text-gray-700 text-[13.5px] leading-4">
                            Other
                          </ContextMenuSubTrigger>
                          <ContextMenuSubContent className="w-48 bg-green-300">
                            <TimeOffMenuItem
                              label="On call"
                              value={TimeOffOption.OnCall}
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
