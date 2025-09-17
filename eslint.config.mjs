import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js }, extends: ["js/recommended"], 
    languageOptions: { globals: globals.node } },

    {
      rules: {
        'no-unused-vars': 'error',
        'no-undef': 'error',
        'prefer-const': 'error',
        'no-unused-expressions': 'error',
        'no-console': 'warn',
        '@typescript-eslint/no-explicit-any': '0',
      },
    },
    {
      ignores: ['**/.env/', '**/dist/', '**/node_modules/'],
    },


  tseslint.configs.recommended,
]);
