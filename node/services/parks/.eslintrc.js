const shared = require('../../../.eslintrc.js');

module.exports = {
  ...shared,
  root: true,
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
