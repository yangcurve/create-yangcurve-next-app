import { FlatCompat } from '@eslint/eslintrc'
import { type PrettierConfig } from '@trivago/prettier-plugin-sort-imports'

export default new FlatCompat().config({
  parser: '@typescript-eslint/parser',
  plugins: ['prefer-arrow'],
  extends: ['next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules', '.next', '**/*.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        printWidth: 120,
        singleQuote: true,
        importOrder: [],
        importOrderSortSpecifiers: true,
        plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
      } satisfies PrettierConfig,
    ],
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'react/display-name': 'off',
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],
  },
})
