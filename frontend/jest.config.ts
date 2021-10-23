export default {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  modulePaths: ['src'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
