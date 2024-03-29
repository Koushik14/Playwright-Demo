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
    //baseURL: 'https://dev-portal-stage.artandwriting.org/',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    acceptDownloads: true,
    },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'Art & Write Automation Test Suite - Chrome Browser',
      use: {
        ...devices['Desktop Chrome'],
        // launchOptions: {
        // args: ['--start-maximized']}
      },
    },
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['iPhone 13'],browserName: 'chromium',

    //   },
    // },
    // {
    //   name: "chromium@Samsung Galaxy S23 Ultra:@browserstack-mobile",
    //   use: {
    //     baseURL: "https://www.bstackdemo.com/",
    //     browserName: "chromium",
    //     channel: "chrome",
    //   },
    // },
    
  ],
  // Run your local dev server before starting the tests.
//   webServer: {
//     command: 'npm run start',
//     url: 'http://127.0.0.1:3000',
//     reuseExistingServer: !process.env.CI,
//   },
});