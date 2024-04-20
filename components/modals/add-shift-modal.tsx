"use client";

import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { Shift } from "@prisma/client";

import { toast } from "@/components/ui/use-toast";
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

import { addShift } from "@/actions/add-shift";
import { updateShift } from "@/actions/update-shift";

import { ShiftFormSchema } from "@/schema/schema";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

interface AddShiftModalProps {
  isFormModal: boolean;
  shift: Shift | null;
  setIsFormModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShift: React.Dispatch<React.SetStateAction<Shift | null>>;
}

export const AddShiftModal: React.FC<AddShiftModalProps> = ({
  isFormModal,
  setIsFormModal,
  shift,
  setShift,
}) => {
  const [loading, setLoading] = useState(false);

  const shiftDate = useAddShiftStore((state) => state.shiftDate);
  const employeeId = useAddShiftStore((state) => state.employeeId);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const title = shift ? "Edit shift" : "Add shift";
  const actions = shift ? "Save changes" : "Create shift";
  const toastDescription = shift ? "Shift updated" : "Shift added";

  const form = useForm<z.infer<typeof ShiftFormSchema>>({
    resolver: zodResolver(ShiftFormSchema),
    defaultValues: {
      department: "",
      shiftTime: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof ShiftFormSchema>) => {
    try {
      setLoading(true);
      if (shift) {
        await updateShift(values, shift.id);
        form.reset();
      } else {
        await addShift(values, employeeId, shiftDate);
        form.reset();
      }

      toast({
        description: `${toastDescription}`,
      });
    } catch (error) {
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      setEmployeeId("");
      setShift(null);
      setIsFormModal(false);
    }
  };

  const handleClose = () => {
    setShift(null);
    setIsFormModal(false);
    form.reset();
  };

  return (
    <Modal
      title={title}
      description="Create shift to employee"
      isOpen={isFormModal}
      onClose={handleClose}
    >
      <Separator />
      <div className="py-4 mb-1">
        <p className="text-sm text-gray-700">
          <span>{format(shiftDate, "EEEE MMMM dd, yyyy")}</span>
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
            <Button
              disabled={loading}
              type="submit"
              className="bg-green-500 text-[13.5px] leading-4"
            >
              {actions}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
