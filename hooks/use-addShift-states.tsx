import { create } from "zustand";

interface useAddShiftModal {
  shiftDate: Date;
  setShiftDate: (date: Date) => void;
  employeeId: string;
  setEmployeeId: (id: string) => void;
}

export const useAddShiftModal = create<useAddShiftModal>((set) => ({
  shiftDate: new Date(),
  setShiftDate: (date: Date) => set({ shiftDate: date }),
  employeeId: "",
  setEmployeeId: (id: string) => set({ employeeId: id }),
}));
