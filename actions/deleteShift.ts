"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function deleteShift(shiftId: string) {
  try {
    await db.shift.delete({
      where: {
        id: shiftId,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    return {
      message: "Database Error: Failed to delete shift.",
    };
  }
}
