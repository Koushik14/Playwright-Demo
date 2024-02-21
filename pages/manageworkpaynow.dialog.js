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
        await expect(this.manageWorkPayNowPageHeaderText,'Pay Now Dialog Header Displayed').toBeVisible();
        await expect(this.manageWorkPayNowButton,'Pay Now Button Displayed').toBeVisible();
    }

    async clickPayNowButton(){
        await this.manageWorkPayNowButton.click();
    }

    async waitForPayNowModalLoad(){
        await expect(this.manageWorkPayNowModal,'Pay Now Dialog Modal Displayed').toBeVisible();
        
    }
}