"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { EmployeeFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";

type EmployeeInputs = z.infer<typeof EmployeeFormSchema>;

export async function updateEmployee(
  values: EmployeeInputs,
  employeeId: string
) {
  const employeeDataValidation = EmployeeFormSchema.safeParse(values);

  if (!employeeDataValidation.success) {
    return {
      errors: employeeDataValidation.error.flatten().fieldErrors,
      message: "Failed to add employee.",
    };
  }

  const { name, jobTitle, dateStarted, payrollId, hourlyRate } =
    employeeDataValidation.data;

  try {
    const result = await db.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        name,
        jobTitle,
        dateStarted,
        payrollId,
        hourlyRate,
      },
    });

    revalidatePath("/employees");
    return result;
  } catch (error) {
    return {
      message: "Database Error: Failed to update employee.",
    };
  }
}
