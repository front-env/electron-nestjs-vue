import { defineStore } from "pinia";

export const useElectronStore = defineStore({
  id: "electron",
  state: () => ({
    preloadRoot: "",
  }),
  actions: {
    async initPreloadRoot() {
      if (window.ESAPI) {
        const preloadRoot = await window.ESAPI.getPreloadRoot();
        this.preloadRoot = preloadRoot;
      }
      return "";
    },
  },
});
