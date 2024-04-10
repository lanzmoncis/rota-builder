"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/db/db";

export async function AddTimeOff(
  value: string,
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
        date,
        department: "",
        shiftTime: "",
        timeOff: value,
        employeeId,
      },
    });

    revalidatePath("/dashboard");
  } catch (error) {
    return { message: "Database Error: Failed to add time off." };
  }
}
