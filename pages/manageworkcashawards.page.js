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
        await expect(this.manageWorkCashAwardsPageHeaderText).toBeVisible();
        await expect(this.manageWorkCashAwardsTab).toBeVisible();
        await expect(this.manageWorkCashAwardsText).toBeVisible();
        await expect(this.manageWorkCashAwardsLifeAwardText).toBeVisible();
        await expect(this.manageWorkCashAwardsSaveAndContButton).toBeVisible();
    }

    async waitForCashAwardsPageLoad(){
        await this.page.waitForURL('**/cash-awards');
        
    }
    
}