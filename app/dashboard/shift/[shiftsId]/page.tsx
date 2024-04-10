import { db } from "@/db/db";
import ShiftsForm from "./components/shifts-form";

const ShiftsPage = async ({ params }: { params: { shiftsId: string } }) => {
  const shift = await db.shift.findUnique({
    where: {
      id: params.shiftsId,
    },
  });
  return (
    <div className="space-y-4 p-8">
      <ShiftsForm initialData={shift} />
    </div>
  );
};

export default ShiftsPage;
