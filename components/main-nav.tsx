"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Home, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathName = usePathname();

  const routes = [
    {
      href: "/dashboard",
      name: "Home",
      icon: Home,
    },
    {
      href: "/employees",
      name: "Employees",
      icon: Users,
    },
  ];

  return (
    <nav>
      <ul className="flex flex-col gap-3 text-gray-700">
        {routes.map((route, index) => {
          const isActive = pathName === route.href;
          const Icon = route.icon;

          return (
            <li key={index}>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm hover:bg-gray-100 hover:text-gray-800 duration-200 font-medium flex items-center gap-3 py-3 px-6",
                  isActive ? "bg-gray-100 text-gray-800" : ""
                )}
              >
                <Icon className="w-5 h-5" color="#15803d" />
                <span>{route.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNav;
