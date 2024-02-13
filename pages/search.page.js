import test, { expect } from 'playwright/test';
const searchObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/searchworkobjectelement.json')));

exports.SearchPage = class SearchPage{
    constructor(page){
        this.page=page;
        this.searchWorkPageHeaderText=page.getByRole('heading', { name: searchObjLocator.searchWorkPageHeaderText });
        this.searchCombo=page.getByRole(searchObjLocator.searchCombo);
        this.searchPageNavigationIcon=page.locator(searchObjLocator.searchPageNavigationIcon);
        this.searchResultBox=page.locator(searchObjLocator.searchResultBox);
        this.searchResultFirstCellTitle=page.getByRole('cell', { name: searchObjLocator.searchResultFirstCellTitle });
        this.searchTextContent=page.locator(searchObjLocator.searchTextContent);
        this.searchResultLoadingButton=page.locator(searchObjLocator.searchResultLoadingButton);
        
    }

    async verifySearchPageDisplay(){
        await expect(this.searchWorkPageHeaderText).toBeVisible();
    }

    async searchComboSelect(selectSearchValue){
        await this.searchCombo.selectOption(selectSearchValue);

    }

    async searchTab(enterTabName){
        await this.page.getByRole('tab', { name: enterTabName }).click();
    }

    async searchButtonClick(tabName, searchButtonText){
        await this.page.getByLabel(tabName, { exact: true }).getByRole('button', { name: searchButtonText, exact: true }).click();
        
    }

    async searchPageNavIconDisplay(){
        //const iconDisplay = await expect(this.searchPageNavigationIcon).toBeVisible();
        //return iconDisplay;
        //await this.page.waitForXPath(this.searchPageNavigationIcon);
        await expect(this.searchPageNavigationIcon).toBeVisible();
    }

    async searchLoadingDisplay(){
        await expect(this.searchResultLoadingButton).toBeHidden();
        return true;
    }

    async clickSearchPageNavIcon(){
        await this.searchPageNavigationIcon.click();
        await expect(this.searchPageNavigationIcon).toBeVisible();
        //await this.page.waitForNavigation();
    }

    async searchResultFirstCellDisplay(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.searchResultBox).toBeVisible();
        await expect(this.searchResultFirstCellTitle).toBeVisible();
        
    }

    async getSearchResultCountText(){
        const resultContent = await this.searchTextContent.textContent();
        return resultContent;
        //console.log(resultContent);

    }
}