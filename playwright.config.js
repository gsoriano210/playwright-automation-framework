const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});