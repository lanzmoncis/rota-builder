"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

interface AddShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  loading: boolean;
  date: Date | null;
  employee: string | null;
}

const AddShiftModal: React.FC<AddShiftModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading,
  date,
  employee,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
      <div className="flex gap-4">
        <Input
          type="text"
          className="border-0 border-b-2 focus-visible:ring-0 focus:border-green-500 rounded-none"
          placeholder="Add department"
        />
        <Input
          type="text"
          className="border-0 border-b-2 focus-visible:ring-0 focus:border-green-500 rounded-none"
          placeholder="Add shift time"
        />
      </div>
      <div className="items-center justify-end w-full pt-6 space-x-2">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default AddShiftModal;
