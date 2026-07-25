module.exports = {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  moduleDirectories: ['node_modules', 'backend/node_modules'],
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 80,
      functions: 95,
      lines: 85,
    },
  },
  verbose: true,
};
