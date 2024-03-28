"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 112, height = 80 }) => {
  const src = "/shifty-logo.png";
  return (
    <div className="flex justify-center items-center max-h-20 relative">
      <Image src={src} alt="logo" width={width} height={height} />
    </div>
  );
};

export default Logo;
