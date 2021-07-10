module.exports = {
  extends: ['airbnb-typescript/base'],
  parser: '@typescript-eslint/parser',
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
