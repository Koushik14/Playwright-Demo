import test, { expect } from 'playwright/test';
const manageWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/managemyworkentryobjectelement.json')));

exports.ManageWorkPage = class ManageWorkPage {
    constructor(page){
        this.page=page;
        this.manageWorkHeaderText=page.locator(manageWorkObjLocator.manageWorkPageHeaderText);
        this.manageWorkBasicInfoTab=page.locator(manageWorkObjLocator.manageWorkBasicInfoTab);
        this.manageWorkTitleTextBox=page.getByPlaceholder(manageWorkObjLocator.manageWorkTitleTextBox);
        this.manageWorkCatTypeDropdown=page.locator(manageWorkObjLocator.manageWorkCategoryTypeDropdown);
        this.manageWorkCatCodeDropdown=page.locator(manageWorkObjLocator.manageWorkCategoryCodeDropdown);
        this.manageWorkBriefSummary=page.getByLabel(manageWorkObjLocator.manageWorkBriefSummary);
        this.manageWorkEducatorDropdown=page.locator(manageWorkObjLocator.manageWorkEducatorDropdown);
        this.manageWorkSaveAndContinueButton=page.getByRole('button', { name: manageWorkObjLocator.manageWorkSaveAndContinueButtton });
        this.manageWorkSaveAndCloseButton=page.getByRole('button', { name: manageWorkObjLocator.manageWorkSaveAndCloseButtton });
    }

    async verifyManageWorkPage(){
        await expect(this.manageWorkHeaderText).toBeVisible();
        await expect(this.manageWorkBasicInfoTab).toBeVisible();
    }

    async enterWorkTitle(workTitle){
        await this.manageWorkTitleTextBox.fill(workTitle);

    }

    async enterCatType(catType){
        await this.manageWorkCatTypeDropdown.selectOption(catType);

    }

    async enterCatCode(catCode){
        await this.manageWorkCatCodeDropdown.selectOption(catCode);

    }

    async enterBriefSummary(briefSummary){
        await this.manageWorkBriefSummary.fill(briefSummary);

    }

    async enterEducatorValue(educatorValue){
        await this.manageWorkEducatorDropdown.selectOption(educatorValue);

    }

    async clickSaveAndContinueButton(){
        await this.manageWorkSaveAndContinueButton.click();
                
    }

    async clickSaveAndCloseButton(){
        await this.manageWorkSaveAndCloseButton.click();
        
    }

    async enterManageWorkData(workTitle,catType,catCode,briefSummary,educatorValue){
        await this.manageWorkTitleTextBox.fill(workTitle);
        await this.manageWorkCatTypeDropdown.selectOption(catType);
        await this.manageWorkCatCodeDropdown.selectOption(catCode);
        await this.manageWorkBriefSummary.fill(briefSummary);
        await this.manageWorkEducatorDropdown.selectOption(educatorValue);
    }

}