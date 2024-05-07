"use client";

import { Button } from "@/components/ui/button";

import NextLogo from "../public/next.svg";
import VercelLogo from "../public/vercel.svg";
import TailwindLogo from "../public/tailwindcss-logotype.svg";
import PrismaLogo from "../public/Prisma-DarkLogo.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full px-6 flex flex-col justify-center items-center mx-auto">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-[50%]">
        <h1 className="text-9xl font-medium text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
          Shifty
        </h1>
        <p className="mt-6 text-center text-sm leading-loose text-gray-600 mb-6 w-3/4">
          Building rotas should be fast and simple. Our platform makes it
          effortless to create and manage schedules efficiently, so you can
          focus on what matters most.
        </p>
        <Button size={"lg"} className="text-md">
          Login
        </Button>
      </div>
      <div className="pb-8 absolute bottom-0">
        <div className="flex flex-col items-center">
          <span className="font-bold uppercase tracking-tighter text-xs text-gray-400 mb-2">
            built with
          </span>
          <div className="aspect-auto flex flex-row gap-8">
            <Image
              src={NextLogo}
              className="w-20 h-10"
              alt="Next Logo"
              priority
            />
            <Image
              src={TailwindLogo}
              className="w-36 h-10"
              alt="Vercel Logo"
              priority
            />
            <Image
              src={PrismaLogo}
              className="w-20 h-10"
              alt="Vercel Logo"
              priority
            />
            <Image
              src={VercelLogo}
              className="w-20 h-10"
              alt="Vercel Logo"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
