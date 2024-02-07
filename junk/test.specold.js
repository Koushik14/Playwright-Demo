const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { LoginPage } from './loginpage';
import { DashboardPage } from './dashboardpage';
import { MyaccountPage } from './myaccountpage';
const logindata =JSON.parse(JSON.stringify(require('./testData.json')));


test.describe("DDT", ()=>{

  test("HTTP Authentication",async({browser})=>{
    const context = await browser.newContext({
      httpCredentials : {
        username: "storefront",
        password: "storefront"

      }
    })
    const page = await context.newPage();
    await page.goto('https://staging-na01-halfpricebooks.demandware.net/s/hpb/home');
    
    const loginPage = new LoginPage(page);
    await loginPage.login(logindata.userName,logindata.Password);
    //await page.goto('https://staging-na01-halfpricebooks.demandware.net/s/hpb/account?registration=false')
    //await page.waitForURL('**/s/hpb/account?registration=false');
    
   //await page.pause();
    const myaccountPage = new MyaccountPage(page);
    await myaccountPage.validateMyAccountDashboard();
    page.pause();

  })

})

