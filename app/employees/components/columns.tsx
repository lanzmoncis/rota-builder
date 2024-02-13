"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EmployeeColumn = {
  id: string;
  name: string;
  jobTitle: string;
  payrollId: string;
  hourlyRate: string;
  dateStarted: string;
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "payrollId",
    header: "Payroll ID",
  },
  {
    accessorKey: "jobTitle",
    header: "Job title",
  },
  {
    accessorKey: "hourlyRate",
    header: "Hourly rate",
  },
  {
    accessorKey: "dateStarted",
    header: "Date started",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
