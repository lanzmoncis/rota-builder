"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { format } from "date-fns";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { EmployeeTypeWithShifts } from "@/lib/actions";

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  date: Date | null;
  employee: string | null;
  employees: EmployeeTypeWithShifts[];
}

const formSchema = z.object({
  department: z.string().min(1, {
    message: "Department must be at least 1 character.",
  }),
  shiftTime: z.string().min(1, {
    message: "Shift time must be at least 1 character.",
  }),
});

const AddShiftModal: React.FC<AddShiftModalProps> = ({
  isOpen,
  onClose,
  loading,
  date,
  employees,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
      shiftTime: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // const employeeIndex = employees.findIndex((emp) => emp.name === employee);
    // if (employeeIndex !== -1) {
    //   const newShift = {
    //     date: date?.toISOString() || "",
    //     department: values.department,
    //     shiftTime: values.shiftTime,
    //   };
    //   employees[employeeIndex].shifts.push(newShift);
    // }
    // onClose();
  };

  return (
    <Modal
      title="Add Shift"
      description="Create shift to employee"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Separator />
      <div className="py-4 mb-1">
        <p className="text-sm">
          {/* {employee && `${employee}, `} */}
          <span>{date && `${format(date, "EEEE MMMM dd, yyyy")}`}</span>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Add department"
                      type="text"
                      className="border-0 border-b-2 focus-visible:ring-0 focus:border-green-500 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shiftTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Add shift time"
                      type="text"
                      className="border-0 border-b-2 focus-visible:ring-0 focus:border-green-500 rounded-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="items-center justify-end w-full pt-6 space-x-2">
            <Button disabled={loading} variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddShiftModal;
