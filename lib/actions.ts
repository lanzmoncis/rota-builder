"use server";

import { z } from "zod";
import { formSchema } from "./schema";

type Inputs = z.infer<typeof formSchema>;

export async function addEmployee(data: Inputs) {
  const employeeDataValidation = formSchema.safeParse(data);

  if (employeeDataValidation.success) {
    return { success: true, data: employeeDataValidation.data };
  }

  if (employeeDataValidation.error) {
    return { success: false, error: employeeDataValidation.error.format() };
  }
}
