import { defineStore } from "pinia";

export const useToggleStore = defineStore("toggleStore", {
  state: () => ({
    useAudio: <boolean>true,
    useStream: <boolean>false,
  }),
  actions: {
    toggleUseAudio() {
      this.useAudio = !this.useAudio;
      // console.log(this.useAudio);
    },
    toggleUseStream() {
      this.useStream = !this.useStream;
      // console.log(this.useStream);
    },
    getUseStream() {
      return this.useStream;
    },
    getUseAudio() {
      return this.useAudio;
    },
  },
});
