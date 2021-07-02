module.exports = {
  extends: ['airbnb-typescript/base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/prefer-default-export': 0,
  },
  ignorePatterns: [
    'services/**/dist/',
    'node_modules/',
  ],
};
