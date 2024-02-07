"use server";

import { z } from "zod";
import { formSchema } from "./schema";
import { db } from "./db";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof formSchema>;

export async function addEmployee(values: Inputs) {
  const employeeDataValidation = formSchema.safeParse(values);

  if (!employeeDataValidation.success) {
    return {
      errors: employeeDataValidation.error.flatten().fieldErrors,
      message: "Failed to add employee.",
    };
  }

  const { name, jobTitle, dateStarted, payrollId, hourlyRate } =
    employeeDataValidation.data;

  try {
    const result = await db.employee.create({
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
      message: "Database Error: Failed to Create Post.",
    };
  }
}
