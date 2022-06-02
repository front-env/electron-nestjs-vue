require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    ".eslintrc-auto-import.json",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
