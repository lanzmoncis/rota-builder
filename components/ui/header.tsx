"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Calendar, Users } from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getInitials } from "@/lib/get-initials";

import { routes } from "@/constants/routes";

const Header = () => {
  const { user } = useKindeBrowserClient();

  const pathName = usePathname().substring(1);

  return (
    <div className="py-2 pr-2 flex justify-between items-center">
      <div className="bg-white w-5/6 text-center rounded-sm shadow-sm flex justify-center items-center gap-2 p-1">
        {routes.map(
          (route, index) =>
            pathName.startsWith(route.href.substring(1)) && (
              <div key={index} className="flex items-center gap-2">
                {route.icon === Calendar && (
                  <Calendar size={16} strokeWidth={1.75} color={"#15803d"} />
                )}
                {route.icon === Users && (
                  <Users size={16} strokeWidth={1.75} color={"#15803d"} />
                )}
                <span className="text-[13.5px] leading-4 text-gray-700">
                  {route.name}
                </span>
              </div>
            )
        )}
      </div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            {user?.picture ? (
              <Image
                src={user?.picture}
                alt="Profile picture"
                width={50}
                height={50}
                className="rounded-full w-7 h-7"
              />
            ) : (
              <div className="rounded-full w-7 h-7 bg-green-400 flex items-center justify-center">
                {getInitials(user?.given_name)}
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <LogoutLink className="w-full text-[13.5px] leading-4 text-gray-700">
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Header;
