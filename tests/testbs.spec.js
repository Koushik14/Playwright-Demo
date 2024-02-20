import { test } from '@playwright/test';
import { devices } from 'playwright';
import { chromium } from 'playwright';

const { _android } = require('playwright');
import { SignInPage } from '../pages/signin.page';
import { MyAccountPage } from '../pages/myaccount.page';
import { ManageWorkPage } from '../pages/managework.page';
import { UploadWorkPage } from '../pages/manageworkuploadwork.page';
import { CashAwards } from '../pages/manageworkcashawards.page';
import { WorkReviewPage } from '../pages/manageworkreview.page';
import { PayNowDialog } from '../pages/manageworkpaynow.dialog';
import { PaymentPage } from '../pages/manageworkpayment.page';
import { CheckoutStripe } from '../pages/checkoutstripe.page';
import { allure } from "allure-playwright";
import * as csv from 'fs'
import { path } from 'path';
import { parse } from 'csv-parse/sync';

const logindata = JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata = JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));

const loginCSV = parse(csv.readFileSync('./testdata/logindata.csv', 'utf-8'), {
  columns: true,
  skip_empty_lines: true
});


const BrowserStackLocal = require("browserstack-local");
const util = require("util");
const cp = require('child_process');
const clientPlaywrightVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

// BrowserStack Specific Capabilities.
// Set 'browserstack.local:true For Local testing
const caps = {
  osVersion: "13.0",
  deviceName: "Samsung Galaxy S23 Ultra", // "Samsung Galaxy S22 Ultra", "Google Pixel 7 Pro", "OnePlus 9", etc.
  browserName: "chrome",
  realMobile: "true",
  name: "My android playwright test",
  idleTimeout: 300,
  build: "playwright-build-1",
  "browserstack.username": process.env.BROWSERSTACK_USERNAME || "koushikmandal_nXzjl4",
  "browserstack.accessKey":
    process.env.BROWSERSTACK_ACCESS_KEY || "BBoWqRBQUoGyWGWgcmVa",
  "browserstack.local": process.env.BROWSERSTACK_LOCAL || false,
};

exports.bsLocal = new BrowserStackLocal.Local();

// replace YOUR_ACCESS_KEY with your key. You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
exports.BS_LOCAL_ARGS = {
  key: process.env.BROWSERSTACK_ACCESS_KEY || "BBoWqRBQUoGyWGWgcmVa",
};

test.skip("Browser Stack Login Flow Testing", async ({ }) => {
  test.slow();
  //test.setTimeout(90000);

  const options = {
    acceptDownloads: true,
    baseURL: 'https://dev-portal-stage.artandwriting.org/',
    bypassCSP: true,
    colorScheme: 'dark',

  }

  const endpointURL = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
  const device = await _android.connect(endpointURL, options);
  console.log(device.model());
  console.log(device.serial());
  await device.shell('am force-stop com.android.chrome');
  const context = await device.launchBrowser();

  const page = await context.newPage();

  const loginPage = new SignInPage(page);
  await loginPage.signPage();
  await page.screenshot({ path: './screenshots/BSSignInPage.png', fullPage: true });
  //Login using JSON file data
  //await loginPage.login(logindata.userName,logindata.Password);
  //Login using CSV Data File
  //console.log(isMobile)
  for (const csvLoginData of loginCSV) {
    await loginPage.login(csvLoginData.userName, csvLoginData.Password);


  }
  const myaccountPage = new MyAccountPage(page);
  await myaccountPage.verifyMyAccountDashboard();
  await page.screenshot({ path: './screenshots/MyAccountDashboardPage.png', fullPage: true });
  await context.close();
  await device.close();


})


test.skip("Browser Stack Local Testing", async ({ }) => {
  test.setTimeout(90000);

  const options = {
    acceptDownloads: true,
    baseURL: 'https://dev-portal-stage.artandwriting.org/',
    bypassCSP: true,
    colorScheme: 'dark',

  }

  const endpointURL = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
  const device = await _android.connect(endpointURL, options);
  console.log(device.model());
  console.log(device.serial());
  //await device.shell('am force-stop com.android.chrome');
  const context = await device.launchBrowser();

  const page = await context.newPage();
  await page.goto('https://dev-portal-stage.artandwriting.org/');
  console.log(await page.evaluate(() => window.location.href));
  await page.screenshot({ path: 'page-chrome-1.png' });
  await context.close();

});


