import test, { expect } from 'playwright/test';
const uploadWorkReviewLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkreviewobjectelement.json')));

exports.WorkReviewPage = class WorkReviewPage {
    constructor(page){
        this.page=page;
        this.manageWorkReviewPageHeaderText=page.locator(uploadWorkReviewLocator.manageWorkReviewPageHeaderText);
        this.manageWorkReviewTab=page.locator(uploadWorkReviewLocator.manageWorkReviewTab);
        this.manageWorkReviewUploadedWriting=page.locator(uploadWorkReviewLocator.manageWorkReviewUploadedWriting);
        this.manageWorkReviewCopyright=page.locator(uploadWorkReviewLocator.manageWorkReviewCopyright);
        this.manageWorkReviewTermsAndConditions=page.locator(uploadWorkReviewLocator.manageWorkReviewTermsAndConditions);
        this.manageWorkReviewEnterForJudgingButton=page.locator(uploadWorkReviewLocator.manageWorkReviewEnterForJudgingButton);
        
    }

    async verifyReviewWorkPage(){
        await expect(this.manageWorkReviewPageHeaderText).toBeVisible();
        await expect(this.manageWorkReviewTab).toBeVisible();
        await expect(this.manageWorkReviewUploadedWriting).toBeVisible();
    }

    async waitForReviewWorkPageLoad(){
        await this.page.waitForURL('**/review');
    }

    async clickReviewCopyrightButton(){
        await this.manageWorkReviewCopyright.click();

    }

    async clickReviewTermsAndConditionsButton(){
        await this.manageWorkReviewTermsAndConditions.click();
    }

    async clickReviewEnterForJudgingButton(){
        //await this.page.click("//button[text()='Enter for Judging']");
       
        await this.manageWorkReviewEnterForJudgingButton.click();

    }
}