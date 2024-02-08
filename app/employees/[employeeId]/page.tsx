import { db } from "@/lib/db";

import EmployeeForm from "./components/employee-form";

const EmployeePage = async ({ params }: { params: { employeeId: string } }) => {
  const employee = await db.employee.findUnique({
    where: {
      id: params.employeeId,
    },
  });
  return (
    <div>
      <EmployeeForm />
    </div>
  );
};

export default EmployeePage;
