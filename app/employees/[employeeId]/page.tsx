import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db/db";

import EmployeeForm from "./components/employee-form";

const EmployeePage = async ({ params }: { params: { employeeId: string } }) => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const employee = await db.employee.findUnique({
    where: {
      id: params.employeeId,
    },
  });
  return (
    <div className="space-y-4 p-8">
      <EmployeeForm initialData={employee} />
    </div>
  );
};

export default EmployeePage;
