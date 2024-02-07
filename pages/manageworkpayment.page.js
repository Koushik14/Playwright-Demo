import test, { expect } from 'playwright/test';
const uploadWorkPaymentLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkpaymentobjectelement.json')));

exports.PaymentPage = class PaymentPage {
    constructor(page){
        this.page=page;
        this.manageWorkPaymentPageHeaderText=page.locator(uploadWorkPaymentLocator.manageWorkPaymentPageHeaderText);
        this.manageWorkPaymentPageWorks=page.locator(uploadWorkPaymentLocator.manageWorkPaymentPageWorks);
        this.manageWorkSelectPaymentWork=page.locator(uploadWorkPaymentLocator.manageWorkSelectPaymentWork);
        this.manageWorkPaymentPayButton=page.locator(uploadWorkPaymentLocator.manageWorkPaymentPayButton);
        this.manageWorkPayRadioButtonCCDC= page.getByRole(uploadWorkPaymentLocator.manageWorkPaymentOptionCC).locator(uploadWorkPaymentLocator.manageWorkPaymentOptionlocatorCC);
        this.manageWorkPaymentConfirmButton=page.getByRole('button', { name: uploadWorkPaymentLocator.manageWorkPaymentConfirmButton });
                
    }

    async waitForPaymentPageLoad(){
        await this.page.waitForURL('**/payment?selectedEntry=**');
        //await this.page.waitForLoadState('domcontentloaded');
        await expect(this.manageWorkSelectPaymentWork).toBeHidden();
    }

    async verifyPaymentPage(){
        await expect(this.manageWorkPaymentPageHeaderText).toBeVisible();
        await expect(this.manageWorkPaymentPageWorks).toBeVisible();
        
    }

    async selectPayWithCCDC(){
        await this.manageWorkPayRadioButtonCCDC.first().click();

    }

    async clickPayButton(){
        await this.manageWorkPaymentPayButton.click();
        await this.manageWorkPaymentConfirmButton.click();
        await this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => {});
          });

          await this.manageWorkPaymentPayButton.click();
          await this.manageWorkPaymentConfirmButton.click();

          

    }
}