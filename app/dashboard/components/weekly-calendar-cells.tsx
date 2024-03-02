import React, { useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { Edit, Trash, CalendarPlus } from "lucide-react";

import { deleteShift } from "@/lib/actions";
import { cn } from "@/lib/utils";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { EmployeeWithShift } from "@/types";

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

  const setShiftDate = useAddShiftStore((state) => state.setShiftDate);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const router = useRouter();
  const { toast } = useToast();

  const dateFormat = "EEE. MMM. dd, yyyy";
  const shiftDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    shiftDates.push(format(currentDate, dateFormat));
  }

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
                        setShiftDate(new Date(date));
                        setEmployeeId(employee.id);
                        const shift = employee.shifts.find(
                          (shift) =>
                            format(new Date(shift.date), dateFormat) === date
                        );
                        const route = shift
                          ? `/dashboard/shift/${shift.id}`
                          : `/dashboard/shift/new`;
                        router.push(route);
                      }}
                    >
                      {employee.shifts.some(
                        (shift) =>
                          format(new Date(shift.date), dateFormat) === date
                      ) ? (
                        <Edit className="w-4 h-4 mr-2" />
                      ) : (
                        <CalendarPlus className="w-4 h-4 mr-2" />
                      )}
                      {employee.shifts.some(
                        (shift) =>
                          format(new Date(shift.date), dateFormat) === date
                      )
                        ? "Edit"
                        : "Add"}
                    </ContextMenuItem>
                    {employee.shifts.some(
                      (shift) =>
                        format(new Date(shift.date), dateFormat) === date
                    ) ? (
                      <ContextMenuItem
                        onClick={() => {
                          const shift = employee.shifts.find(
                            (shift) =>
                              format(new Date(shift.date), dateFormat) === date
                          );
                          if (shift) {
                            setOpen(true);
                            setShiftId(shift.id);
                          }
                        }}
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </ContextMenuItem>
                    ) : null}
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
