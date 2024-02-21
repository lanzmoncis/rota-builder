import { create } from "zustand";

interface useAddShiftModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAddShiftModal = create<useAddShiftModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
