"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Resend } from "resend";
import { redirect } from "next/navigation";

import { EmployeeWithShift } from "@/types/types";

import { EmailTemplate } from "@/components/email-template";

interface EmployeeData {
  employees: EmployeeWithShift[];
}

// to send a batch of emails containing shifts to each employee
export async function SendBatchEmail({ employees }: EmployeeData) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    redirect("/api/auth/login");
  }

  const data = await resend.batch.send(
    employees.map((employee) => {
      return {
        from: "Noreply<onboarding@resend.dev>",
        to: employee.email,
        subject: "SHIFTS",
        react: EmailTemplate({
          name: employee.name,
          shifts: employee.shifts,
        }) as React.ReactElement,
      };
    })
  );

  // const { data } = await resend.emails.send({
  //   from: "Acme <onboarding@resend.dev>",
  //   to: ["delivered@resend.dev"],
  //   subject: "Hello world",
  //   react: EmailTemplate({ name: "John" }) as React.ReactElement,
  // });

  console.log(data);
}
