<script setup lang="ts">
import { useElectronStore } from "./stores/electron";
import { RouterView } from "vue-router";

const store = useElectronStore();
store.initPreloadRoot();
</script>

<template>
  <RouterView />
</template>
