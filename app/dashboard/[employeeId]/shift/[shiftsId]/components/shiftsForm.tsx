import { Shift } from "@prisma/client";

interface ShiftsFormProps {
  initialData: Shift | null;
}

const ShiftsForm: React.FC<ShiftsFormProps> = ({ initialData }) => {
  return <div>Shifts form</div>;
};

export default ShiftsForm;
