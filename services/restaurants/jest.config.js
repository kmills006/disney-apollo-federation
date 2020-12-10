module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testRegex: "/__tests__/.*\\.test\\.(js|ts)$",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  clearMocks: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts*"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.ts",
  ],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};
