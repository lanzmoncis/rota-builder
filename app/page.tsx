"use client";

import Image from "next/image";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

import { Button } from "@/components/ui/button";

import NextLogo from "../public/next.svg";
import VercelLogo from "../public/vercel.svg";
import TailwindLogo from "../public/tailwindcss-logotype.svg";
import PrismaLogo from "../public/Prisma-DarkLogo.svg";
import ShiftyLogo from "../public/logo-base-256x256.png";

export default function Home() {
  return (
    <div className="absolute px-4 md:px-10 lg:px-36 py-11 flex flex-col md:justify-center md:items-center h-full overflow-hidden w-full">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#1AB366_100%)]"></div>
      <div className="mx-auto flex w-full justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={ShiftyLogo}
            className="w-10 h-10"
            alt="Vercel Logo"
            priority
          />
          <div className="text-2xl md:text-2xl font-extrabold text-[#1AB366]">
            Shifty
          </div>
        </div>
        <div>
          <Button className="font-semibold tracking-wide rounded-full px-4 bg-[#1AB366]">
            <LoginLink>Sign up today</LoginLink>
          </Button>
        </div>
      </div>
      <div className="grow flex items-center justify-center px-4">
        <div>
          <p className="text-5xl md:text-7xl text-slate-900 font-semibold text-center mb-6 max-w-4xl mx-auto">
            Rota <span className="text-[#1AB366]">made simple</span> for small
            businesses
          </p>
          <p className="md:text-lg text-slate-700 text-center mb-6 max-w-2xl mx-auto text-balance tracking-wide">
            Building rotas should be fast and simple. Our platform makes it
            effortless to create and manage schedules efficiently, <br /> so you
            can focus on what matters most.
          </p>
          <div className="text-center">
            <Button className=" font-semibold tracking-wide rounded-full px-4 bg-[#1AB366]">
              <LoginLink>Get started today</LoginLink>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center">
          <span className="font-bold uppercase tracking-wider text-sm text-slate-700 mb-2">
            built with
          </span>
          <div className="aspect-auto flex flex-row gap-4 md:gap-8">
            <Image
              src={NextLogo}
              className="md:w-[120px] md:h-12 w-16"
              alt="Next Logo"
              priority
            />
            <Image
              src={TailwindLogo}
              className="md:w-[190px] md:h-12 w-24"
              alt="Vercel Logo"
              priority
            />
            <Image
              src={PrismaLogo}
              className="md:w-[110px] md:h-12 w-16"
              alt="Vercel Logo"
              priority
            />
            <Image
              src={VercelLogo}
              className="md:w-[110px] md:h-12 w-16"
              alt="Vercel Logo"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
