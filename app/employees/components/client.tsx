"use client";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmployeesClient = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="p-8 font-medium">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl">Employees</h2>
          <p className="text-[12px] text-muted-foreground">
            Manage your employees
          </p>
        </div>
        <Button onClick={() => router.push(`/employees/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add new
        </Button>
      </div>
    </div>
  );
};

export default EmployeesClient;
