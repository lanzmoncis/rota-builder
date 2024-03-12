import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function deleteEmployee(employeeId: string) {
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
