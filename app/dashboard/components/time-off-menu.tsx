"use client";

import React from "react";

import { ContextMenuItem } from "@/components/ui/context-menu";

interface TimeOffMenuItemProps {
  label: string;
  value: string;
  date: string;
  employeeId: string;
  handleTimeOff: (value: string, employeeId: string, date: Date) => void;
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
