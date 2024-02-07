import test, { expect } from 'playwright/test';
const uploadWorkPayNowLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkpaynowobjectelement.json')));

exports.PayNowDialog = class PayNowDialog {
    constructor(page){
        this.page=page;
        this.manageWorkPayNowPageHeaderText=page.locator(uploadWorkPayNowLocator.manageWorkPayNowPageHeaderText);
        this.manageWorkPayNowButton=page.locator(uploadWorkPayNowLocator.manageWorkPayNowButton);
        this.manageWorkPayNowModal=page.getByRole(uploadWorkPayNowLocator.manageWorkPayNowModal);
    }

    async verifyPayNowDialog(){
        await expect(this.manageWorkPayNowPageHeaderText).toBeVisible();
        await expect(this.manageWorkPayNowButton).toBeVisible();
    }

    async clickPayNowButton(){
        await this.manageWorkPayNowButton.click();
    }

    async waitForPayNowModalLoad(){
        await expect(this.manageWorkPayNowModal).toBeVisible();
        
    }
}