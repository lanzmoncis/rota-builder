"use client";

import Image from "next/image";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

import { Button } from "@/components/ui/button";

import NextLogo from "../public/next.svg";
import VercelLogo from "../public/vercel.svg";
import TailwindLogo from "../public/tailwindcss-logotype.svg";
import PrismaLogo from "../public/Prisma-DarkLogo.svg";

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-screen w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-200 opacity-20 blur-[100px]"></div>
      </div>
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="max-w-2xl flex flex-col items-center justify-center text-center px-12 grow">
          <h1 className="text-9xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
            Shifty
          </h1>
          <p className="mt-6 text-sm/loose text-gray-600 mb-6">
            Building rotas should be fast and simple. Our platform makes it
            effortless to create and manage schedules efficiently, so you can
            focus on what matters most.
          </p>
          <Button size={"lg"} className="text-sm px-6 font-semibold">
            <LoginLink>Try shifty for free</LoginLink>
          </Button>
        </div>
        <div className="pb-8 fixed bottom-0">
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
    </>
  );
}
