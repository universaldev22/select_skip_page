import { create } from "zustand";
import { Skip } from "@/interfaces/skip";

interface SkipStore {
  selectedSkip: Skip | null;
  setSelectedSkip: (skip: Skip | null) => void;
  clearSelectedSkip: () => void;
}

export const useSkipStore = create<SkipStore>((set) => ({
  selectedSkip: null,
  setSelectedSkip: (skip) => set({ selectedSkip: skip }),
  clearSelectedSkip: () => set({ selectedSkip: null }),
}));
