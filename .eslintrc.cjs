module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "react-refresh"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/consistent-type-exports": [
      "error",
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
  },
};
