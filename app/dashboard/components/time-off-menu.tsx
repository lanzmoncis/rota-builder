"use client";

import React from "react";

import { ContextMenuItem } from "@/components/ui/context-menu";
import { TimeOffOption } from "@/types/types";

interface TimeOffMenuItemProps {
  label: string;
  value: TimeOffOption;
  date: string;
  employeeId: string;
  handleTimeOff: (value: TimeOffOption, employeeId: string, date: Date) => void;
}

export const TimeOffMenuItem: React.FC<TimeOffMenuItemProps> = ({
  label,
  value,
  date,
  employeeId,
  handleTimeOff,
}) => {
  return (
    <ContextMenuItem
      onClick={() => {
        const offDate = new Date(date);
        handleTimeOff(value, employeeId, offDate);
      }}
    >
      {label}
    </ContextMenuItem>
  );
};
