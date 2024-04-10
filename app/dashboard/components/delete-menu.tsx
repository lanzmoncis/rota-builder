"use client";

import { format } from "date-fns";

import { Trash } from "lucide-react";

import { dateFormatWithYear } from "@/constants/date-format";

import { EmployeeWithShift } from "@/types/types";

import { ContextMenuItem } from "@/components/ui/context-menu";

interface DeleteMenuProps {
  employee: EmployeeWithShift;
  date: String;
  setOpen: (value: boolean | ((prevValue: boolean) => boolean)) => void;
  setShiftId: (value: string | ((prevValue: string) => string)) => void;
}

export const DeleteMenu: React.FC<DeleteMenuProps> = ({
  employee,
  date,
  setOpen,
  setShiftId,
}) => {
  const handleClick = () => {
    const shift = employee.shifts.find(
      (shift) => format(new Date(shift.date), dateFormatWithYear) === date
    );
    if (shift) {
      setOpen(true);
      setShiftId(shift.id);
    }
  };

  return (
    <ContextMenuItem onClick={handleClick}>
      <Trash className="w-4 h-4 mr-2" />
      Delete
    </ContextMenuItem>
  );
};
