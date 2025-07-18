/**
 * ESLint configuration for TypeScript files
 *
 * This configuration:
 * - Uses TypeScript parser for .ts and .tsx files
 * - Enables strict TypeScript rules
 * - Warns about explicit 'any' types
 * - Allows flexible function return type inference
 */

import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
