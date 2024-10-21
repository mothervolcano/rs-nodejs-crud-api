export default {
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['<rootDir>/tests/**/*.(test).ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  restoreMocks: true,
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globalTeardown: './tests/teardown.mjs' 
};
