import { create } from 'zustand';

interface FilterState {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedFilter: "All",
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),
}));
