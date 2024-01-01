"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathName = usePathname();

  const routes = [
    {
      href: "/dashboard",
      name: "Home",
    },
    {
      href: "/employees",
      name: "Employees",
    },
  ];

  return (
    <>
      {routes.map((route) => {
        const isActive = pathName === route.href;

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm transition-colors hover:text-primary",
              isActive ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {route.name}
          </Link>
        );
      })}
    </>
  );
};

export default MainNav;
