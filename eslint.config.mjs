import eslint from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
    ...globals.node,
  },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      playwright,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...playwright.configs['playwright-test'].rules,
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
        },
      ],
    },
    ignores: ['dist', 'node_modules'],
  },
];
