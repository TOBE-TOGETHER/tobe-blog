module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',

  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal'],
      'newlines-between': 'always'
    }],
    'import/no-unresolved': 'off',
    'prettier/prettier': ['error', {}, {
      'usePrettierrc': true
    }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
