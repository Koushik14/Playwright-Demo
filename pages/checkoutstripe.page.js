import test, { expect } from 'playwright/test';
const checkoutStripeLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkcheckoutstripeobjectelement.json')));

exports.CheckoutStripe = class CheckoutStripe {
    constructor(page){
        this.page=page;
        this.manageWorkCheckoutStripePageHeaderText=page.locator(checkoutStripeLocator.manageWorkCheckoutStripePageHeaderText);
        //this.manageWorkCheckoutStripePageHeaderText=page.getByText('Pay with ');
        // this.manageWorkCheckoutStripeEmailTextBox=page.getByLabel(checkoutStripeLocator.manageWorkCheckoutStripeEmailTextBox);
        // this.manageWorkCheckoutStripeCardNumber=page.getByPlaceholder(checkoutStripeLocator.manageWorkCheckoutStripeCardNumber);
        // this.manageWorkCheckoutStripeExpDate=page.getByPlaceholder(checkoutStripeLocator.manageWorkCheckoutStripeExpDate);
        // this.manageWorkCheckoutStripeCVV=page.getByPlaceholder(checkoutStripeLocator.manageWorkCheckoutStripeCVV);
        // this.manageWorkCheckoutStripeCardHolderName=page.getByPlaceholder(checkoutStripeLocator.manageWorkCheckoutStripeCardHolderName);

        this.manageWorkCheckoutStripeEmailTextBox=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeEmailTextBox);
        this.manageWorkCheckoutStripeCardNumber=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeCardNumber);
        this.manageWorkCheckoutStripeExpDate=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeExpDate);
        this.manageWorkCheckoutStripeCVV=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeCVV);
        this.manageWorkCheckoutStripeCardHolderName=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeCardHolderName);
        this.manageWorkCheckoutStripePayButton=page.getByTestId(checkoutStripeLocator.manageWorkCheckoutStripePayButton);
        this.manageWorkCheckoutStripeSelectCountry=page.locator(checkoutStripeLocator.manageWorkCheckoutStripeSelectCountry);
    }

    async verifyCheckoutStripe(){
        
        await this.page.waitForURL('**/cs_test_**');
        //await expect(this.manageWorkCheckoutStripePageHeaderText).toBeVisible();
    }

    async checkoutPageEnterEmail(enterEmail){
        await this.manageWorkCheckoutStripeEmailTextBox.fill(enterEmail);
    }

    async checkoutPageEnterCardNumber(enterCardNumber){
        await this.manageWorkCheckoutStripeCardNumber.fill(enterCardNumber);
    }

    async checkoutPageEnterExpDate(enterExpDate){
        await this.manageWorkCheckoutStripeExpDate.fill(enterExpDate);
    }

    async checkoutPageEnterCVV(enterCVV){
        await this.manageWorkCheckoutStripeCVV.fill(enterCVV);
    }

    async checkoutPageEnterCardHolderName(enterCardHolderName){
        await this.manageWorkCheckoutStripeCardHolderName.fill(enterCardHolderName);
    }

    async checkoutPageSelectCountry(enterCountryName){
        await this.manageWorkCheckoutStripeSelectCountry.selectOption(enterCountryName);
    }

    async clickCheckoutPayButton(){
        await this.manageWorkCheckoutStripePayButton.click();
        await this.page.waitForNavigation();
    }

    async verifyPaymentProcess(){
        //await this.page.waitForURL('**/paymentsuccess**');
        //await this.page.waitForNavigation();
        //await this.page.waitForURL('**/work?type=A');
        //await expect(this.page).toHaveURL('https://dev-portal-stage.artandwriting.org/participants/dashboard/work?type=A');
        await this.page.goto('https://dev-portal-stage.artandwriting.org/participants/dashboard/work?type=W');
        
    }

}