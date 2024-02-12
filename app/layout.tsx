import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/navigation/sidebar";
import Header from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shifty",
  description: "Shifty rota builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <Sidebar />
          <Header />
          <main className="bg-gray-50">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
