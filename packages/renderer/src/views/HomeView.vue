<script setup lang="ts">
// import { useElectronStore } from "../stores/electron";
const clickHandle = async () => {
  console.log("ipcRender.invoke!");
  const port = await window.ESAPI?.getPort();
  console.log(port);
};
// import ElectronWebview from "@/components/electron-webview.vue";

// import { computed } from "vue";

// const store = useElectronStore();
// const preload = computed(() => [store.preloadRoot, "anotherpage.js"].join("/"));
</script>

<template>
  <div>
    <div class="p-8">
      <el-button type="primary" size="default" @click="clickHandle"
        >ipcRender.invoke test</el-button
      >
    </div>
  </div>
</template>
