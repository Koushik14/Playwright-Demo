import test, { expect } from 'playwright/test';
const myaccountObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/myaccountobjectelement.json')));

exports.MyAccountPage = class MyAccountPage {
constructor(page){
    this.page=page;
    this.dashboardLink=page.locator(myaccountObjLocator.myaccountDashboardText);
    this.dashboardAccountLink=page.locator(myaccountObjLocator.myaccountSecDashboardText);
    this.dashboardMyAccountWorkTab=page.locator(myaccountObjLocator.myaccountWorkTab);
    this.dashboardMyAccountPortfolioTab=page.locator(myaccountObjLocator.myaccountPortfolioTab);
    this.dashboardMyAccountAddWorkButton=page.getByLabel(myaccountObjLocator.myaccountAddWorkButton);
    this.dashboardMyAccountWritingWorkButton=page.locator(myaccountObjLocator.myaccountWritingWorkButton);
    //this.dashboardMyAccountWritingWork=page.locator(myaccountObjLocator.myaccountWritingMyWork);
    this.dashboardMyAccountWritingWorkDetails=page.locator(myaccountObjLocator.myaccountWritingWorkDetails);
    //this.myaccountWritingWorkDisplay=page.locator(myaccountObjLocator.myaccountWritingWorkDisplay);
    this.myaccountWritingWorkDisplay=page.getByLabel('Work').getByText('Loading...');
    this.myaccountMessageInfo=page.locator(myaccountObjLocator.myaccountMessageInfo);
    this.myaccountMyWritingWork=page.locator(myaccountObjLocator.myaccountMyWritingWork);
    //this.myaccountMyWritingWork=page.wait_for_selector(myaccountObjLocator.myaccountMyWritingWork);
    this.myaccountArtDeadLineHeader=page.locator(myaccountObjLocator.myaccountArtDeadLineHeader);
    this.myaccountWritingDeadLineHeader=page.locator(myaccountObjLocator.myaccountWritingDeadLineHeader);
    
}

async verifyMyAccountDashboard(){
    await expect(this.myaccountArtDeadLineHeader,'Art Deadline Content Displayed').toBeVisible();
    await expect(this.myaccountWritingDeadLineHeader,'Writing Deadline Content Displayed').toBeVisible();
}

async verifyWorkTab(){
    await expect(this.dashboardMyAccountWorkTab,'My Account My Work Dashboard Displayed').toBeVisible();
}

async verifyPortfolioTab(){
    await expect(this.dashboardMyAccountPortfolioTab,'My Account Portfolio Dashboard Displayed').toBeVisible();
}

async clickWorkTab(){
    await this.dashboardMyAccountWorkTab.click();
}

async clickAddWorkButton(){
    await this.dashboardMyAccountAddWorkButton.click();
    await this.page.waitForURL('**/participants/work');
}

async clickPortfolioTab(){
    await this.dashboardMyAccountPortfolioTab.click();
}

async verifyWritingWork(){
    await this.page.waitForURL('**/work?type=W');
    //await this.page.waitForLoadState('networkidle');
    await expect(this.myaccountMyWritingWork,'Submitted Writing Work Displayed').toBeVisible({ timeout: 20000 }); 
   
}




}