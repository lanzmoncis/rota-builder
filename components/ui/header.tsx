"use client";

import { User, LogOut, Moon } from "lucide-react";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";

// Styling to be change
const Header = () => {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div>
      <ul className="flex justify-end items-center h-16 border-b py-4 px-6 gap-6">
        <li>
          <User color="#15803d" className="w-5 h-5" />
        </li>
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
