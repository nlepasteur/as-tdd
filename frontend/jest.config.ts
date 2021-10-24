export default {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  modulePaths: ['src'],
  moduleNameMapper: {
    '^views(.*)$': '<rootDir>/src/views$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
