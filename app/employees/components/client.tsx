"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { EmployeeColumn, columns } from "./columns";

interface EmployeeClientProps {
  data: EmployeeColumn[];
}

export const EmployeesClient: React.FC<EmployeeClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
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
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
