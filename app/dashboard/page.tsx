import WeeklyCalendar from "../dashboard/components/weekly-calendar";
import { db } from "@/lib/db";

const DashboardPage = async () => {
  const employees = await db.employee.findMany({
    include: {
      shifts: true,
    },
  });

  return (
    <div>
      <WeeklyCalendar employees={employees} />
    </div>
  );
};

export default DashboardPage;
