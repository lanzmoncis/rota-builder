"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { ShiftFormSchema } from "@/schema/schema";
import { db } from "@/db/db";

type AddShiftInputs = z.infer<typeof ShiftFormSchema>;

export async function updateShift(values: AddShiftInputs, shiftId: string) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const addShiftDataValidation = ShiftFormSchema.safeParse(values);

  if (!addShiftDataValidation.success) {
    return {
      errors: addShiftDataValidation.error.flatten().fieldErrors,
      message: "Failed to update shift.",
    };
  }

  const { department, shiftTime } = addShiftDataValidation.data;
  try {
    await db.shift.update({
      where: {
        id: shiftId,
      },
      data: {
        department,
        shiftTime,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    return {
      message: "Database Error: Failed to add shift.",
    };
  }
}
