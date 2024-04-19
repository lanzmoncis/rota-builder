"use client";

import { format } from "date-fns";
import { Edit, CalendarPlus } from "lucide-react";

import { Shift } from "@prisma/client";

import { ContextMenuItem } from "@/components/ui/context-menu";

import { dateFormatWithYear } from "@/constants/date-format";

import { EmployeeWithShift } from "@/types/types";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

interface AddEditMenuProps {
  employee: EmployeeWithShift;
  date: string;
  setIsFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShift: React.Dispatch<React.SetStateAction<Shift | null>>;
}

export const AddEditMenu: React.FC<AddEditMenuProps> = ({
  employee,
  date,
  setIsFormModal,
  setShift,
}) => {
  const setShiftDate = useAddShiftStore((state) => state.setShiftDate);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const handleClick = () => {
    setEmployeeId(employee.id);
    setShiftDate(new Date(date));
    const shift = employee.shifts.find(
      (shift) => format(new Date(shift.date), dateFormatWithYear) === date
    );

    if (shift) {
      setShift(shift);
    }
    setIsFormModal(true);
  };

  return (
    <ContextMenuItem
      onClick={handleClick}
      className="text-gray-700 text-[13.5px] leading-4"
    >
      {employee.shifts.some(
        (shift) => format(new Date(shift.date), dateFormatWithYear) === date
      ) ? (
        <Edit className="w-4 h-4 mr-2" color={"#374151"} />
      ) : (
        <CalendarPlus className="w-4 h-4 mr-2" color={"#374151"} />
      )}
      {employee.shifts.some(
        (shift) => format(new Date(shift.date), dateFormatWithYear) === date
      )
        ? "Edit shift"
        : "Add shift"}
    </ContextMenuItem>
  );
};
