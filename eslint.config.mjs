import pluginTs from "@typescript-eslint/eslint-plugin";
import parserTs from "@typescript-eslint/parser";

import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
ignores: [
  "**/dist/**",
  "**/node_modules/**",
  "**/coverage",
  "**/build/**",
    "**/*.config.js",
    "**/*.config.cjs",
    "**/*.config.mjs",
    "**/*.config.ts",

    "**/vite.config.*",

    // package-specific config files (frontend + backend)
    "frontend/eslint.config.mjs",
    "backend/eslint.config.mjs",
    ],
  },

  {
    languageOptions: {
      parser: parserTs,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
          allowDefaultProject: true,
        tsconfigRootDir: __dirname,
      },
    },

    plugins: {
      "@typescript-eslint": pluginTs,
      react,
      "react-hooks": reactHooks,
      prettier,
    },

    rules: {
      ...pluginTs.configs["recommended-type-checked"].rules,

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,

      "prettier/prettier": "error",
    },

    settings: {
      react: { version: "detect" },
    },
  },
];
