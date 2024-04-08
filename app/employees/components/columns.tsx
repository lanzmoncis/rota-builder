"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-actions";
import { EmployeeAvatar } from "./employee-avatar";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type EmployeeColumn = {
  id: string;
  name: string;
  jobTitle: string;
  payrollId: string;
  hourlyRate: string;
  imageUrl: string;
  dateStarted: string;
};

export const columns: ColumnDef<EmployeeColumn>[] = [
  {
    accessorKey: "imageUrl",
    header: undefined,
    cell: ({ row }) => (
      <EmployeeAvatar
        imageUrl={row.getValue("imageUrl")}
        name={row.getValue("name")}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
