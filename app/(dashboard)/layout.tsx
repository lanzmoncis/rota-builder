import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login");
  }
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-muted/40">
      <Sidebar />
      <Header />
      <main className="bg-white rounded-sm">{children}</main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
