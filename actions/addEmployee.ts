"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { EmployeeFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";

type EmployeeInputs = z.infer<typeof EmployeeFormSchema>;

export async function addEmployee(values: EmployeeInputs) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const user = await getUser();

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
    const result = await db.employee.create({
      data: {
        name,
        jobTitle,
        dateStarted,
        payrollId,
        hourlyRate,
        userId: user?.id as string,
      },
    });

    revalidatePath("/employees");
    return result;
  } catch (error) {
    return {
      message: "Database Error: Failed to add employee.",
    };
  }
}
