import { create } from "zustand";

const useStore = create((set) => ({
  formula: [],
  suggestionsList: [],
  setFormula: (formula) => set(() => ({ formula })),
  setSuggestions: (suggests) =>
    set(() => ({
      suggestionsList: [...suggests],
    })),
}));

export default useStore;
