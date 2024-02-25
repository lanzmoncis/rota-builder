import { db } from "@/lib/db";
import ShiftsForm from "./components/shiftsForm";

const ShiftsPage = async ({ params }: { params: { shiftsId: string } }) => {
  const shift = await db.shift.findUnique({
    where: {
      id: params.shiftsId,
    },
  });
  return (
    <div>
      <ShiftsForm initialData={shift} />
    </div>
  );
};

export default ShiftsPage;
