"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { EmployeeFormSchema } from "@/schema/schema";
import { db } from "@/db/db";

type EmployeeInputs = z.infer<typeof EmployeeFormSchema>;

export async function updateEmployee(
  values: EmployeeInputs,
  employeeId: string
) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const employeeDataValidation = EmployeeFormSchema.safeParse(values);

  if (!employeeDataValidation.success) {
    return {
      errors: employeeDataValidation.error.flatten().fieldErrors,
      message: "Failed to update employee.",
    };
  }

  const {
    name,
    jobTitle,
    dateStarted,
    payrollId,
    hourlyRate,
    imageUrl,
    email,
  } = employeeDataValidation.data;

  try {
    const result = await db.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        imageUrl,
        name,
        email,
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
