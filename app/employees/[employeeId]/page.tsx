import { db } from "@/lib/db";

import EmployeeForm from "./components/employee-form";

const EmployeePage = async ({ params }: { params: { employeeId: string } }) => {
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
