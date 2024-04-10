"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { ShiftFormSchema } from "@/schema/schema";
import { db } from "@/db/db";

type AddShiftInputs = z.infer<typeof ShiftFormSchema>;

export async function addShift(
  values: AddShiftInputs,
  employeeId: string,
  date: Date
) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  const addShiftDataValidation = ShiftFormSchema.safeParse(values);

  if (!addShiftDataValidation.success) {
    return {
      errors: addShiftDataValidation.error.flatten().fieldErrors,
      message: "Failed to add shift.",
    };
  }

  const { department, shiftTime } = addShiftDataValidation.data;
  try {
    const result = await db.shift.create({
      data: {
        department,
        shiftTime,
        date,
        employeeId,
      },
    });

    revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return {
      message: "Database Error: Failed to add shift.",
    };
  }
}
