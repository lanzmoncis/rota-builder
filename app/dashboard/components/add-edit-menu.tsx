"use client";

import { format } from "date-fns";

import { useRouter } from "next/navigation";

import { Edit, CalendarPlus } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

import { dateFormatWithYear } from "@/constants/date-format";

import { EmployeeWithShift } from "@/types/types";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

interface AddEditMenuProps {
  employee: EmployeeWithShift;
  date: string;
}

export const AddEditMenu: React.FC<AddEditMenuProps> = ({ employee, date }) => {
  const setShiftDate = useAddShiftStore((state) => state.setShiftDate);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const router = useRouter();

  const handleClick = () => {
    setShiftDate(new Date(date));
    setEmployeeId(employee.id);
    const shift = employee.shifts.find(
      (shift) => format(new Date(shift.date), dateFormatWithYear) === date
    );
    const route = shift
      ? `/dashboard/shift/${shift.id}`
      : `/dashboard/shift/new`;
    router.push(route);
  };

  return (
    <ContextMenuItem onClick={handleClick}>
      {employee.shifts.some(
        (shift) => format(new Date(shift.date), dateFormatWithYear) === date
      ) ? (
        <Edit className="w-4 h-4 mr-2" />
      ) : (
        <CalendarPlus className="w-4 h-4 mr-2" />
      )}
      {employee.shifts.some(
        (shift) => format(new Date(shift.date), dateFormatWithYear) === date
      )
        ? "Edit shift"
        : "Add shift"}
    </ContextMenuItem>
  );
};
