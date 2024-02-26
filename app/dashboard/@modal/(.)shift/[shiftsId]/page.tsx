import AddShiftModal from "@/components/modals/add-shift-modal";
import { db } from "@/lib/db";

const AddShiftModalPage = async ({
  params,
}: {
  params: { shiftsId: string };
}) => {
  const shift = await db.shift.findUnique({
    where: {
      id: params.shiftsId,
    },
  });

  return (
    <>
      <AddShiftModal initialData={shift} />
    </>
  );
};

export default AddShiftModalPage;
