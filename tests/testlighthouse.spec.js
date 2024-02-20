const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
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
import { SearchPage } from '../pages/search.page';
const { playAudit } = require('playwright-lighthouse');
import * as constants from '../pages/constant';
import {runPageAudit} from '../pages/playaudit';



const logindata = JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata = JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));
const searchdata = JSON.parse(JSON.stringify(require('../testdata/searchdata.json')));

const loginCSV = parse(csv.readFileSync('./testdata/logindata.csv', 'utf-8'), {
  columns: true,
  skip_empty_lines: true
});

const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'], // Include all categories for desktop
      formFactor: 'desktop',
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
  },
};

test.describe("Art & Writing Site", () => {

  test.skip("Lighthouse Integration", async ({ isMobile }) => {
    test.slow();

    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
      headless: true
    });
    const page = await browser.newPage();
    const loginPage = new SignInPage(page);
    await loginPage.signPage();
    await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
    //Login using JSON file data
    //await loginPage.login(logindata.userName,logindata.Password);
    //Login using CSV Data File
    //console.log(isMobile)
    for (const csvLoginData of loginCSV) {
      if (isMobile == false) {
        await loginPage.adminUserlogin(csvLoginData.userNameAdmin, csvLoginData.PasswordAdmin);
      }
      else {
        await loginPage.adminUserlogin(csvLoginData.userNameAdmin, csvLoginData.PasswordAdmin);
      }

    }
    
    const searchPage = new SearchPage(page);
    await searchPage.verifySearchPageDisplay();
    await searchPage.searchComboSelect(searchdata.searchValue);
    await searchPage.searchButtonClick(searchdata.searchTabName, searchdata.SearchButtonText);
    await searchPage.searchResultFirstCellDisplay();
    var seachText = await searchPage.getSearchResultCountText();
    console.log(seachText);
    await searchPage.clickSearchPageNavIcon();
    var searchIconDisplay = await searchPage.searchLoadingDisplay();
    console.log("Initial Search value :", searchIconDisplay);
    while (searchIconDisplay) {
      await searchPage.clickSearchPageNavIcon();
      var seachText2 = await searchPage.getSearchResultCountText();
      searchIconDisplay = await searchPage.searchLoadingDisplay();
      console.log("From While Loop Search value :", searchIconDisplay);
      console.log(seachText2);

      await playAudit({
        page: page,

        thresholds: {
          performance: 50,
          accessibility: 50,
          'best-practices': 50,
          seo: 50,
          pwa: 50,
        },
        port: 9222,

        reports: {
          formats: {
            html: true, //defaults to false
          },
          name: `lighthouse-${new Date().toISOString()}`, //defaults to `lighthouse-${new Date().getTime()}`
          directory: `${process.cwd()}/lighthouse`, //defaults to `${process.cwd()}/lighthouse`
        },
      });
      await page.close();
      await browser.close();
      
    }

  })

  test.skip("Lighthouse Integration Login Page", async ({ isMobile }) => {
    test.slow();

    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
      headless: true
    });
    const page = await browser.newPage();
    const loginPage = new SignInPage(page);
    await loginPage.signPage();
    await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
    //Login using JSON file data
    //await loginPage.login(logindata.userName,logindata.Password);
    //Login using CSV Data File
    //console.log(isMobile)
    for (const csvLoginData of loginCSV) {
      if (isMobile == false) {
        await loginPage.login(csvLoginData.userName, csvLoginData.Password);
      }
      else {
        await loginPage.login(csvLoginData.userName, csvLoginData.Password);
      }

    }
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.verifyMyAccountDashboard();

    await runPageAudit(page);
    await page.close();
    await browser.close();
    
      
    })

    test.skip("Lighthouse Integration Add Work Page", async ({ isMobile }) => {
      test.slow();
  
      const browser = await chromium.launch({
        args: ['--remote-debugging-port=9222'],
        headless: true
      });
      const page = await browser.newPage();
      const loginPage = new SignInPage(page);
      await loginPage.signPage();
      await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
      //Login using JSON file data
      //await loginPage.login(logindata.userName,logindata.Password);
      //Login using CSV Data File
      //console.log(isMobile)
      for (const csvLoginData of loginCSV) {
        if (isMobile == false) {
          await loginPage.login(csvLoginData.userName, csvLoginData.Password);
        }
        else {
          await loginPage.login(csvLoginData.userName, csvLoginData.Password);
        }
  
      }
      const myaccountPage = new MyAccountPage(page);
      await myaccountPage.verifyMyAccountDashboard();
      await myaccountPage.clickAddWorkButton();
      const manageWorkPage = new ManageWorkPage(page);
      await manageWorkPage.verifyManageWorkPage();
  
      await runPageAudit(page);
      await page.close();
      await browser.close();
      
        
      })
  
})
