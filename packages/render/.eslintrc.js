require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  parserOptions: {
    project: ["tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  ignorePatterns: [".eslintrc.js"],
  env: {
    "vue/setup-compiler-macros": true,
    browser: true,
    es6: true,
    node: true,
  },
};
