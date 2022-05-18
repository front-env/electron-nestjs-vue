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
console.log("basename: ", basename);

const files = glob.sync(`exports/**/*.{js,ts}`).map((uri) => {
  const route = path.relative(`exports`, uri);
  const info = path.parse(route);
  const key = path.join(info.dir, `${info.name}`);
  return {
    key,
    input: path.resolve("exports", route),
    output: path.resolve("../main/dist", basename, `${key}.js`),
  };
});
const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".ts"];

console.log("files: ", files);
export default files.map((item) => ({
  input: item.input,
  output: {
    file: item.output,
    format: "commonjs",
    sourcemap: true,
    banner: "window.addEventListener('DOMContentLoaded', function() {",
    footer: "})",
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
  external: (id) => {
    return /\/node_modules\//.test(id);
  },
}));
