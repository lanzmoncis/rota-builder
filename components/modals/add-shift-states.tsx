"use client";

import * as z from "zod";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
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

import { addShift } from "@/lib/actions";
import { AddShiftFormSchema } from "@/lib/schema";
import { useAddShiftModal } from "@/hooks/use-addShift-modal";

interface AddShiftModalProps {
  shift: Shift | null;
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({ shift }) => {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const shiftDate = useAddShiftModal((state) => state.shiftDate);
  const employeeId = useAddShiftModal((state) => state.employeeId);

  const title = shift ? "Edit shift" : "Add shift";

  const isFormModal =
    pathname === `/dashboard/shift/${params.shiftsId}` ||
    pathname === `/dashboard/shift/new`;

  const onClose = () => router.back();

  const form = useForm<z.infer<typeof AddShiftFormSchema>>({
    resolver: zodResolver(AddShiftFormSchema),
    defaultValues: shift || {
      department: "",
      shiftTime: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AddShiftFormSchema>) => {
    try {
      setLoading(true);
      const result = await addShift(values, employeeId, shiftDate);

      if (!result) {
        toast({
          description: "Something went wrong",
        });
      }

      toast({
        description: "Shift added",
      });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal
      title={title}
      description="Create shift to employee"
      isOpen={isFormModal}
      onClose={onClose}
    >
      <Separator />
      <div className="py-4 mb-1">
        <p className="text-sm">
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
