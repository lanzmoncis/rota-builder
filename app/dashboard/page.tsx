import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/db/db";

import WeeklyCalendar from "../dashboard/components/weekly-calendar";

const DashboardPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  const employees = await db.employee.findMany({
    where: {
      userId: user?.id,
    },
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
