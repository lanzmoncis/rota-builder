"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "label must be at least 1 character.",
  }),
  jobTitle: z.string().min(1, {
    message: "Job title must be at least 1 character",
  }),
  dateStarted: z.date({
    required_error: "Please select a date and time",
    invalid_type_error: "That's not a date!",
  }),
  payrollId: z.string().min(4, {
    message: "Payroll ID must be at least 4 characters",
  }),
  hourlyRate: z.string(),
});

type EmployeeFormValue = z.infer<typeof formSchema>;

const EmployeeForm: React.FC = () => {
  const form = useForm<EmployeeFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      jobTitle: "",
      dateStarted: undefined,
      payrollId: "",
      hourlyRate: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-3 mb-6">
            <div className="flex flex-col gap-6">
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
                      <Input
                        placeholder="Add job title"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateStarted"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date started</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
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
                      <Input
                        placeholder="Add payroll id"
                        type="text"
                        {...field}
                      />
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
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </div>
  );
};

export default EmployeeForm;
