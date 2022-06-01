import { fileURLToPath, URL } from "url";
import type { ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import ElementPlus from "unplugin-element-plus/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv) => {
  return {
    base: "./",
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`,
        },
      },
    },
    plugins: [
      vue(),
      ElementPlus({
        useSource: true,
        defaultLocale: "zh-cn",
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [ElementPlusResolver()],
        dts: "./src/types/auto-imports.d.ts",
        eslintrc: {
          enabled: command === "serve",
        },
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "./src/types/components.d.ts",
      }),
      viteMockServe({
        localEnabled: command === "serve",
        prodEnabled: false,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "../main/dist/renderer",
      emptyOutDir: true,
    },
    server: {
      host: "0.0.0.0",
      port: 5678,
      // strictPort: true,
    },
  };
};
