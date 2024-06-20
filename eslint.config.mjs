/* eslint-disable */
// noinspection JSCheckFunctionSignatures

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
    }
  },
  eslintConfigPrettier,
  {
    // ESLint 에서 제외할 리스트
    ignores: ['vite.config.ts', 'tailwind.config.ts', 'src/types.ts'],
  },
)
