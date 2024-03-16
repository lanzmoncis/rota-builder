"use client";

import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";

import { Shift } from "@prisma/client";

import { AlertModal } from "@/components/modals/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/headings";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { addShift } from "@/actions/addShift";
import { updateShift } from "@/actions/updateShift";
import { deleteShift } from "@/actions/deleteShift";
import { ShiftFormSchema } from "@/lib/schema";

import { useAddShiftStore } from "@/hooks/use-addShift-store";

interface ShiftsFormProps {
  initialData: Shift | null;
}

const ShiftsForm: React.FC<ShiftsFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const shiftDate = useAddShiftStore((state) => state.shiftDate);
  const employeeId = useAddShiftStore((state) => state.employeeId);
  const setEmployeeId = useAddShiftStore((state) => state.setEmployeeId);

  const title = initialData ? "Edit shift" : "Add shift";
  const actions = initialData ? "Save changes" : "Create shift";
  const toastDescription = initialData ? "Shift updated" : "Shift added";

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
      router.push("/dashboard");
      toast({
        description: `${toastDescription}`,
      });
    } catch (error) {
      console.log(error);
      toast({ description: "Something went wrong" });
    } finally {
      setLoading(false);
      setEmployeeId("");
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData) {
        await deleteShift(initialData.id);
      }
      router.refresh();
      router.push("/dashboard");
      toast({ description: "Shift deleted" });
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
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add department"
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
                  <FormItem className="grid grid-cols-[180px_1fr_1.2fr] gap-6 items-center space-y-0">
                    <FormLabel>Shift time</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Add shift time"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-end mt-2">
              <Button disabled={loading} type="submit">
                {actions}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ShiftsForm;
