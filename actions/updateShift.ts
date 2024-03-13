"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { ShiftFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";

type AddShiftInputs = z.infer<typeof ShiftFormSchema>;

export async function updateShift(values: AddShiftInputs, shiftId: string) {
  const addShiftDataValidation = ShiftFormSchema.safeParse(values);

  if (!addShiftDataValidation.success) {
    return {
      errors: addShiftDataValidation.error.flatten().fieldErrors,
      message: "Failed to add shift.",
    };
  }

  const { department, shiftTime } = addShiftDataValidation.data;
  try {
    const result = await db.shift.update({
      where: {
        id: shiftId,
      },
      data: {
        department,
        shiftTime,
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
