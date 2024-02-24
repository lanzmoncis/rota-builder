import { create } from "zustand";

interface useAddShiftModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  shiftDate: Date;
  setShiftDate: (date: Date) => void;
}

export const useAddShiftModal = create<useAddShiftModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  shiftDate: new Date(),
  setShiftDate: (date: Date) => set({ shiftDate: date }),
}));
