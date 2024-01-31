"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "label must be at least 1 character.",
  }),
  jobTitle: z.string().min(1),
  dateStarted: z.date(),
  payrollId: z.number(),
  hourlyRate: z.number(),
});

type EmployeeFormValue = z.infer<typeof formSchema>;

const EmployeeForm: React.FC = () => {
  console.log("IM HERE!");
  // form needs fixing
  const form = useForm<EmployeeFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      jobTitle: "",
      dateStarted: undefined,
      payrollId: undefined,
      hourlyRate: undefined,
    },
  });

  return <div></div>;
};

export default EmployeeForm;
