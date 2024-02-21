import test, { expect } from 'playwright/test';
const uploadWorkCALocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkcashawardsobjectelement.json')));

exports.CashAwards = class CashAwards {
    constructor(page){
        this.page=page;
        this.manageWorkCashAwardsPageHeaderText=page.locator(uploadWorkCALocator.manageWorkCashAwardsPageHeaderText);
        this.manageWorkCashAwardsTab=page.locator(uploadWorkCALocator.manageWorkCashAwardsTab);
        this.manageWorkCashAwardsText=page.locator(uploadWorkCALocator.manageWorkCashAwardsText);
        this.manageWorkCashAwardsSaveAndContButton=page.locator(uploadWorkCALocator.manageWorkCashAwardsSaveAndContButton);
        this.manageWorkCashAwardsLifeAwardText=page.locator(uploadWorkCALocator.manageWorkCashAwardsLifeAwardText);
    }

    async verifyCashAwardPage(){
        await expect(this.manageWorkCashAwardsPageHeaderText,'Work Cash Awards Page Header Content Displayed').toBeVisible();
        await expect(this.manageWorkCashAwardsTab,'Work Cash Awards Tab Displayed').toBeVisible();
        await expect(this.manageWorkCashAwardsText,'Work Cash Awards Content Displayed').toBeVisible();
        await expect(this.manageWorkCashAwardsLifeAwardText,'Work Cash Awards Life Award Content Displayed').toBeVisible();
        await expect(this.manageWorkCashAwardsSaveAndContButton,'Work Cash Awards Page Save & Continue Button Displayed').toBeVisible();
    }

    async waitForCashAwardsPageLoad(){
        await this.page.waitForURL('**/cash-awards');
        
    }
    
}