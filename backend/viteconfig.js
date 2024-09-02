import { defineConfig } from 'vitest/config';


export default defineConfig({
  testEnvironment: 'node', // or 'jsdom' if you need DOM mocking
  globals: true, // make `expect`, `test`, etc. available globally
  setupFiles: ['<rootDir>/tests/setup.ts'], // optional setup file
});