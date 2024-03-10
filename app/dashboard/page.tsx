import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import WeeklyCalendar from "../dashboard/components/weekly-calendar";

const DashboardPage = async () => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
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
