"use client";

import { LogOut, Moon } from "lucide-react";
import Image from "next/image";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  return (
    <div>
      <ul className="flex justify-end items-center h-16 border-b py-4 px-6 gap-6">
        {user && (
          <li className="flex justify-center items-center gap-2">
            {user?.picture && (
              <Image
                src={user?.picture}
                alt="Profile picture"
                width={50}
                height={50}
                className="rounded-full w-7 h-7"
              />
            )}
            {user?.email && (
              <p className="text-sm font-medium text-gray-600">{`${user?.given_name} ${user?.family_name}`}</p>
            )}
          </li>
        )}
        <li>
          <Moon color="#15803d" className="w-5 h-5" />
        </li>
        <li>
          {isAuthenticated && (
            <LogoutLink>
              <LogOut color="#15803d" className="w-5 h-5" />
            </LogoutLink>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Header;
