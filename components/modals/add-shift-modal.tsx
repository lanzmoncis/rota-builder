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

// import { addShift, updateShift } from "@/lib/actions";
import { addShift } from "@/actions/addShift";
import { updateShift } from "@/actions/updateShift";

import { ShiftFormSchema } from "@/lib/schema";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

interface AddShiftModalProps {
  initialData: Shift | null;
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const shiftDate = useAddShiftStore((state) => state.shiftDate);
  const employeeId = useAddShiftStore((state) => state.employeeId);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const title = initialData ? "Edit shift" : "Add shift";
  const actions = initialData ? "Save changes" : "Create shift";
  const toastDescription = initialData ? "Shift updated" : "Shift added";

  const isFormModal =
    pathname === `/dashboard/shift/${params.shiftsId}` ||
    pathname === `/dashboard/shift/new`;

  const onClose = () => router.back();

  const form = useForm<z.infer<typeof ShiftFormSchema>>({
    resolver: zodResolver(ShiftFormSchema),
    defaultValues: initialData || {
      department: "",
      shiftTime: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof ShiftFormSchema>) => {
    try {
      setLoading(true);
      let result;
      if (initialData) {
        result = await updateShift(values, initialData.id);
      } else {
        result = await addShift(values, employeeId, shiftDate);
      }

      if (!result) {
        toast({
          description: "Something went wrong",
        });
      }

      router.refresh();
      toast({
        description: `${toastDescription}`,
      });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      setEmployeeId("");
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
              {actions}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddShiftModal;
