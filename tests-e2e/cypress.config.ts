import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 10000,
    supportFile: false,
    video: false,
    defaultBrowser: 'chromium',
  },
});
