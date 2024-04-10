import { Employee, Shift } from "@prisma/client";

export type EmployeeWithShift = Employee & { shifts: Shift[] };
