"use client";

import { Calendar } from "lucide-react";
import Image from "next/image";

import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
  const { user } = useKindeBrowserClient();

  return (
    <div className="bg-muted/40 py-2 pr-2 flex justify-between">
      <div className="bg-white w-5/6 text-center rounded-sm shadow-sm flex justify-center items-center gap-2">
        <Calendar size={16} strokeWidth={1.75} color={"#15803d"} />
        <span className="text-[13.5px] leading-4 text-gray-700">
          Timesheets
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-3">
          {user && (
            <li>
              {user?.picture && (
                <Image
                  src={user?.picture}
                  alt="Profile picture"
                  width={50}
                  height={50}
                  className="rounded-full w-7 h-7"
                />
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
