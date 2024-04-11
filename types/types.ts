import { Employee, Shift } from "@prisma/client";

export type EmployeeWithShift = Employee & { shifts: Shift[] };

export enum TimeOffOption {
  Personal = "Personal",
  Holiday = "Holiday",
  Maternity = "Maternity",
  SickLeave = "SickLeave",
  OnCall = "OnCall",
}
