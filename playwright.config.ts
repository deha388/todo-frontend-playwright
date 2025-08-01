import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/acceptance',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
}); 