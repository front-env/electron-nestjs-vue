<script setup lang="ts">
import { useElectronStore } from "../stores/electron";
import ElectronWebview from "@/components/electron-webview.vue";
import { computed } from "vue";

const store = useElectronStore();
const preloadRoot = computed(() =>
  [store.preloadRoot, "anotherpage.js"].join("/")
);
</script>

<template>
  <div>
    <electron-webview
      v-if="store.preloadRoot"
      :preloadRoot="preloadRoot"
      src="https://www.gongchang.com"
      style="width: 100vw; height: 100vh"
    ></electron-webview>
  </div>
</template>
