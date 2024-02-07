const { expect } = require('@playwright/test');

const dashboardObjLocator =JSON.parse(JSON.stringify(require('./dashboardOR.json')));




exports.DashboardPage = class DashboardPage {
    constructor(page) {
      this.page = page;

//reading locator value from objectrepository.json
      this.myaccountLoginEmail= page.locator(dashboardObjLocator.verifyloginemail);
      this.myaccountPageTitle = page.locator('heading', { name: 'My Account' });
      this.myaccountLinkName = page.locator('My Account', { exact: true });
      
      
      
      // this.myaccount_loginusertext= page.locator('//p[text()="Hi, "]');
      // this.myaccount_afterloginlink = page.locator('//p[text()="My Account"]');
      // this.myaccount_page = page.locator('//a[@href="/account#"]');
      // this.myaccount_pagetitle = page.locator('//h3[text()="Account Home"]');
    }
  
    async isLoggedIn() {
      // Check if the user is logged in by verifying the existence of a dashboard element

     
      await this.myaccountPageTitle.isVisible();
      await this.myaccountLoginEmail.isVisible();
     
    }
  }