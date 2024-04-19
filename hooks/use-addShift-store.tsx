import { create } from "zustand";
import { persist } from "zustand/middleware";

interface useAddShiftStoreTypes {
  shiftDate: Date;
  setShiftDate: (date: Date) => void;
  employeeId: string;
  setEmployeeId: (id: string) => void;
}

export const useAddShiftStore = create<useAddShiftStoreTypes>((set) => ({
  shiftDate: new Date(),
  setShiftDate: (date: Date) => set({ shiftDate: date }),
  employeeId: "",
  setEmployeeId: (id: string) => set({ employeeId: id }),
}));
