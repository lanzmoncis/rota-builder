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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "label must be at least 1 character.",
  }),
  jobTitle: z.string().min(1),
  dateStarted: z.date(),
  payrollId: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
  hourlyRate: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().positive().min(1)
  ),
});

type EmployeeFormValue = z.infer<typeof formSchema>;

const EmployeeForm: React.FC = () => {
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

  const handleSubmit = (values: z.infer<typeof formSchema>) => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Add name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="jobTitle"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input placeholder="Add job title" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="payrollId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payroll ID</FormLabel>
                <FormControl>
                  <Input placeholder="Add payroll id" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="hourlyRate"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly rate</FormLabel>
                <FormControl>
                  <Input placeholder="Hourly rate" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
