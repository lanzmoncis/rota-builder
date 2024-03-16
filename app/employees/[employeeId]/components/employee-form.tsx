"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Employee } from "@prisma/client";

import { cn } from "@/lib/utils";
import { EmployeeFormSchema } from "@/lib/schema";

import { addEmployee } from "@/actions/addEmployee";
import { updateEmployee } from "@/actions/updateEmployee";
import { deleteEmployee } from "@/actions/deleteEmployee";

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
import { useToast } from "@/components/ui/use-toast";
import { Heading } from "@/components/ui/headings";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";

type EmployeeFormValue = z.infer<typeof EmployeeFormSchema>;

interface EmployeeFormProps {
  initialData: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit employee" : "Add employee";
  const actions = initialData ? "Save changes" : "Create new employee";
  const toastDescription = initialData ? "Employee updated" : "Employee added";

  const form = useForm<EmployeeFormValue>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: initialData || {
      name: "",
      jobTitle: "",
      dateStarted: undefined,
      payrollId: "",
      hourlyRate: "",
    },
  });

  const handleSubmit = async (values: EmployeeFormValue) => {
    try {
      setLoading(true);
      let result;

      if (initialData) {
        result = await updateEmployee(values, initialData.id);
      } else {
        result = await addEmployee(values);
      }

      if (!result) {
        toast({ description: "Something went wrong" });
        return;
      }

      router.refresh();
      router.push("/employees");
      toast({
        description: `${toastDescription}`,
      });
    } catch (error) {
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData) {
        await deleteEmployee(initialData.id);
      }
      router.refresh();
      router.push("/employees");
      toast({ description: "Employee deleted" });
    } catch (error) {
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setOpen(true)}
            size="icon"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="px-6 py-4 bg-white rounded-sm">
            <div className="flex flex-col gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="jobTitle"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Job title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateStarted"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
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
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Payroll ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hourlyRate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Hourly rate</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button type="submit" disabled={loading}>
                {actions}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EmployeeForm;
