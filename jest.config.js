module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(ts|tsx)', '!src/types/*.d.ts'],
  moduleFileExtensions: ['js', 'json', 'ts', 'tsx'],
  testMatch: ['**/tests/**/*.test.(ts|tsx)?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setupTest.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
