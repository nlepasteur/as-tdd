export default {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  modulePaths: ['src'],
  moduleNameMapper: {
    '^views(.*)$': '<rootDir>/src/views$1',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
