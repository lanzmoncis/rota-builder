"use client";

import { MoreHorizontal } from "lucide-react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className=" flex justify-between items-center px-2">
      <span className="font-bold text-xl text-gray-700 tracking-tight">
        Shifty
      </span>
      <div>
        <MoreHorizontal size={20} strokeWidth={1.5} color={"#64748b"} />
      </div>
    </div>
  );
};

export default Logo;
