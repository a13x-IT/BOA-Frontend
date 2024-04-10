import { defineStore } from "pinia";

export const useSmoothingStore = defineStore("smoothingStore", {
  state: () => ({
    smoothingAlgorithm: true,
  }),
  actions: {
    toggleSmoothingalgorithm(): void {
      this.smoothingAlgorithm = !this.smoothingAlgorithm;
    },
  },
});
