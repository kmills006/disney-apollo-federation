module.exports = {
  extends: ['airbnb-typescript/base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.lint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 0,
    'object-curly-newline': 'off',
  },
  ignorePatterns: [
    '*/**/dist/',
    'node_modules',
  ],
};
