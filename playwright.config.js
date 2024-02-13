import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',
  outputDir: 'test-results',

  // Run all tests in parallel.
  //fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  //forbidOnly: !!process.env.CI,

  // Retry on CI only.
  //retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  //workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  //reporter: 'html',
  
  reporter: [
    [
      "allure-playwright",
      
    ],
  ],
  
  // expect: {
  //   timeout: 10 * 1000,
  // },

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    //baseURL: 'http://127.0.0.1:3000',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on'
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['iPhone 13'],browserName: 'chromium',

      },
    },
    
  ],
  // Run your local dev server before starting the tests.
//   webServer: {
//     command: 'npm run start',
//     url: 'http://127.0.0.1:3000',
//     reuseExistingServer: !process.env.CI,
//   },
});