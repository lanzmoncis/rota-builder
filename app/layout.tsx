import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import "./globals.css";

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
          "h-[100dvh] bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
