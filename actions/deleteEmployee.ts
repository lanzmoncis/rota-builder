"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { db } from "@/lib/db";

export async function deleteEmployee(employeeId: string) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  try {
    await db.employee.delete({
      where: {
        id: employeeId,
      },
    });

    revalidatePath("/employees");
  } catch (error) {
    return {
      message: "Database Error: Failed to delete employee.",
    };
  }
}
