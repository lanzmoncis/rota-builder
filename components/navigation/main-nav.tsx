"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/constants/routes";

import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathName = usePathname();

  return (
    <nav>
      <ul className="flex flex-col gap-2 text-gray-700">
        {routes.map((route, index) => {
          const isActive = pathName.startsWith(route.href);
          const Icon = route.icon;

          return (
            <li key={index}>
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  " hover:bg-gray-100 duration-200 flex items-center gap-3 py-[10px] px-4 rounded-sm",
                  isActive ? "bg-gray-100 text-black" : ""
                )}
              >
                <Icon
                  className="size-4"
                  color={isActive ? "#15803d" : "#64748b"}
                  strokeWidth={1.75}
                />
                <span className="text-[13.5px] leading-4">{route.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNav;
