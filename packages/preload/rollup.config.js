import typescript from "@rollup/plugin-typescript";
import path from "path";
import filesize from "rollup-plugin-filesize";
import glob from "glob";

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import strip from "@rollup/plugin-strip";
import globals from "rollup-plugin-node-globals";

import builtins from "rollup-plugin-node-builtins";

const basename = path.basename(__dirname);
const distRoot = path.resolve(__dirname, "../main/dist/", basename);
const MAIN_EXPORTS = "main-exports";
const RENDERER_EXPORTS = "renderer-exports";

const rendererExports = glob
  .sync(`${RENDERER_EXPORTS}/**/*.{js,ts}`)
  .map((uri) => {
    const route = path.relative(RENDERER_EXPORTS, uri);
    const info = path.parse(route);
    const key = path.join(info.dir, `${info.name}`);
    return {
      type: RENDERER_EXPORTS,
      key,
      // wrapper: [
      //   "window.addEventListener('DOMContentLoaded', function() {",
      //   "});",
      // ],
      input: path.resolve(RENDERER_EXPORTS, route),
      output: path.resolve(distRoot, RENDERER_EXPORTS, `${key}.js`),
    };
  });

const mainExports = glob.sync(`${MAIN_EXPORTS}/**/*.{js,ts}`).map((uri) => {
  const route = path.relative(MAIN_EXPORTS, uri);
  const info = path.parse(route);
  const key = path.join(info.dir, `${info.name}`);
  return {
    type: MAIN_EXPORTS,
    key,
    // wrapper: ["", ""],
    input: path.resolve(MAIN_EXPORTS, route),
    output: path.resolve(distRoot, MAIN_EXPORTS, `${key}.js`),
  };
});

const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".ts"];

export default [...rendererExports, ...mainExports].map((item) => ({
  input: item.input,
  output: {
    file: item.output,
    format: item.type === MAIN_EXPORTS ? "commonjs" : "iife",
    sourcemap: false,
    // banner: item.wrapper[0],
    // footer: item.wrapper[1],
  },
  plugins: [
    commonjs(), // converts date-fns to ES modules

    globals(),
    builtins(),

    resolve({
      extensions,
      preferBuiltins: false,
      browser: true,
    }),
    typescript({
      // tsconfig: `./${basename}/tsconfig.json`,
    }),

    production && terser(), // minify, but only in production
    !production && strip(),
    filesize(),
  ],
  external:
    item.type === MAIN_EXPORTS
      ? (id) => {
          return /\/node_modules\//.test(id);
        }
      : (id) => false,
}));
