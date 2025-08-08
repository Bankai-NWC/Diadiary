import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  {
    files: ['client/**/*.{js,jsx}'],
    languageOptions: { globals: globals.browser },
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@components', './client/src/components'],
            ['@page', './client/src/components/page'],
            ['@ui', './client/src/components/ui'],
            ['@assets', './client/src/assets'],
            ['@hooks', './client/src/hooks'],
            ['@store', './client/src/store'],
            ['@fonts', './client/src/fonts'],
            ['@themes', './client/src/themes'],
          ],
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error',
    },
  },

  pluginReact.configs.flat.recommended,

  {
    files: ['server/**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'off',
    },
  },

  prettierConfig,
]);
