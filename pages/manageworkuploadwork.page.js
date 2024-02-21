import test, { expect } from 'playwright/test';
const uploadWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkuploadworkobjectelement.json')));

exports.UploadWorkPage = class UploadWorkPage {
    constructor(page){
        this.page=page;
        this.manageWorkUploadWorkHeaderText=page.locator(uploadWorkObjLocator.manageWorkUploadWorkHeaderText);
        this.manageWorkUploadWorkTab=page.locator(uploadWorkObjLocator.manageWorkUploadWorkTab);
        this.manageWorkUploadWorkContentTextbox=page.locator(uploadWorkObjLocator.manageWorkUploadWorkContentTextbox);
        this.manageWorkUploadWorkMinCharacterText=page.locator(uploadWorkObjLocator.manageWorkUploadWorkMinCharacterText);
        this.manageWorkQuoteWriterRadioButtonNoOption=page.locator(uploadWorkObjLocator.manageWorkQuoteWriterRadioButtonNoOption);
        this.manageWorkParaphraseWriterRadioButtonNoOption=page.locator(uploadWorkObjLocator.manageWorkParaphraseWriterRadioButtonNoOption);
        this.manageWorkInspiredWriterRadioButtonNoOption=page.locator(uploadWorkObjLocator.manageWorkInspiredWriterRadioButtonNoOption);

    }

    async verifyUploadWorkPage(){
        await expect(this.manageWorkUploadWorkHeaderText,'Work Upload Page Header Content Displayed').toBeVisible();
        await expect(this.manageWorkUploadWorkTab,'Work Upload Tab Displayed').toBeVisible();
    }

    async verifyBlankWritingContent(){
        await expect(this.manageWorkUploadWorkContentTextbox,'Blank Writing Content Box Displayed').toBeVisible();
    }

    async verifyMinWritingContentMessage(){
        await expect(this.manageWorkUploadWorkMinCharacterText).toBeVisible();
    }

    async clickQWNoRadioButton(){
        await this.manageWorkQuoteWriterRadioButtonNoOption.first().click();
    }

    async clickParaNoRadioButton(){
        await this.manageWorkParaphraseWriterRadioButtonNoOption.first().click();
    }

    async clickIWNoRadioButton(){
        await this.manageWorkInspiredWriterRadioButtonNoOption.first().click();
    }

    async enterUploadWorkWriting(writingContent){
        await this.manageWorkUploadWorkContentTextbox.fill(writingContent);
    }

    async waitForUploadWorkPageLoad(){
        await this.page.waitForURL('**/upload');
                
    }

    async waitForContentTextboxVisible(){
        await expect(this.manageWorkUploadWorkContentTextbox).toBeVisible();
    }
}