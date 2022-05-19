<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { h } from "@vue/runtime-dom";
const props = defineProps(["src", "preload"]);

const ElectronWebview = {
  render() {
    return h("webview", {
      src: props.src,
      preload: `file:${props.preload}`,
      nodeintegration: true,
    });
  },
};

onMounted(() => {
  const webview = document.querySelector("webview") as HTMLElement;
  webview.addEventListener("console-message", (e: any) => {
    if (e.level === 0) {
      console.log(e.message);
    } else if (e.level === 1) {
      console.info(e.message);
    } else if (e.level === 2) {
      console.warn(e.message);
    } else if (e.level === 3) {
      console.error(e.message);
    }
  });
});
</script>

<template>
  <electron-webview></electron-webview>
</template>
