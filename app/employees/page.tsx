import { format } from "date-fns";

import { db } from "@/lib/db";
import { EmployeesClient } from "./components/client";
import { EmployeeColumn } from "./components/columns";

const EmployeesPage = async () => {
  const employees = await db.employee.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedEmployees: EmployeeColumn[] = employees.map((item) => ({
    id: item.id,
    name: item.name,
    jobTitle: item.jobTitle,
    payrollId: item.payrollId,
    hourlyRate: item.hourlyRate,
    dateStarted: format(item.dateStarted, "MMM do yyyy"),
  }));

  return (
    <div className="p-8 pt-6 space-y-4">
      <EmployeesClient data={formattedEmployees} />
    </div>
  );
};

export default EmployeesPage;
