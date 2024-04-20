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

import { routes } from "@/constants/routes";

const Header = () => {
  const { user } = useKindeBrowserClient();

  const pathName = usePathname().substring(1);

  return (
    <div className="bg-muted/40 py-2 pr-2 flex justify-between">
      <div className="bg-white w-5/6 text-center rounded-sm shadow-sm flex justify-center items-center gap-2">
        {routes.map(
          (route, index) =>
            pathName === route.href.substring(1) && (
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
            {user?.picture && (
              <Image
                src={user?.picture}
                alt="Profile picture"
                width={50}
                height={50}
                className="rounded-full w-7 h-7"
              />
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
