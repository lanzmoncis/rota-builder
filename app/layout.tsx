import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

import Sidebar from "@/components/navigation/sidebar";
import Header from "@/components/ui/header";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="min-h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
          <Sidebar />
          <Header />
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
