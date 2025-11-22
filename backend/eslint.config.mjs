import base from "../eslint.config.mjs";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...base,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        tsconfigRootDir: __dirname,
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      ...tsPlugin.configs.recommended.rules,

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },
];
