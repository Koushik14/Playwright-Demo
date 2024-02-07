const { expect } = require('@playwright/test');
exports.MyaccountPage= class MyaccountPage{
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.myaccountLink = page.locator('heading', { name: 'My Account' });
        //this.gettingMyAccountLink = page.locator('heading', { name: 'My Account' });
        this.getOrderDetailsPage = page.locator('//*[@id="collapsible-accountsidebar"]/li[2]/a');
       
      }
    
      
    
      async validateMyAccountDashboard() {
        await this.myaccountLink.isVisible();
        await this.getOrderDetailsPage.click();
        
      }
    
    

};