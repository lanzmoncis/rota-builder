"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/headings";

import { EmployeeColumn, columns } from "./columns";

interface EmployeeClientProps {
  data: EmployeeColumn[];
}

export const EmployeesClient: React.FC<EmployeeClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Employees" />
        <Button
          className="text-[13.5px] leading-4"
          size="sm"
          onClick={() => router.push(`/employees/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
    </>
  );
};
