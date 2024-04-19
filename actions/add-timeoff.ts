"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db/db";
import { TimeOffOption } from "@/types/types";

export async function AddTimeOff(
  value: TimeOffOption,
  employeeId: string,
  date: Date
) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  try {
    await db.shift.create({
      data: {
        shiftTime: "N/A",
        department: "N/A",
        date,
        timeOff: value,
        employeeId,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    return { message: "Database Error: Failed to add time off." };
  }
}
