import test, { expect } from 'playwright/test';
const panelsEntryObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/panelentryobjectelement.json')));

exports.PanelsEntryPage = class PanelsEntryPage{
    constructor(page){
        this.page=page;
        this.panelentryeliminationroundcontent=page.locator(panelsEntryObjLocator.panelentryeliminationroundcontent);
        this.panelentryworkroundscontent=page.locator(panelsEntryObjLocator.panelentryworkroundscontent);
        this.panelentryworkroundsfirstrowcell=page.locator(panelsEntryObjLocator.panelentryworkroundsfirstrowcell);
        this.panelentryclosebutton=page.locator(panelsEntryObjLocator.panelentryclosebutton);
        this.panelentrystartjudgingbutton=page.locator(panelsEntryObjLocator.panelentrystartjudgingbutton);
        this.panelentryviewbutton=page.locator(panelsEntryObjLocator.panelentryviewbutton);
        this.panelentryworkroundsrowcount=page.locator(panelsEntryObjLocator.panelentryworkroundsrowcount);
        
    }

    async verifyPanelEntryPage(){
        await Promise.all([
            this.panelentryeliminationroundcontent.waitFor().then(()=>true),
            this.panelentryworkroundscontent.waitFor().then(()=>true),
            this.panelentryworkroundsfirstrowcell.waitFor().then(()=>true),
            await expect(this.panelentryeliminationroundcontent).toBeVisible({timeout:10000}),
            await expect(this.panelentryworkroundscontent).toBeVisible(), 
            await expect(this.panelentryworkroundsfirstrowcell).toBeVisible(),            
        ]).catch((error) => {
            throw new error("Panels Entry page not Displayed");
        });
    }

    async clickPanelEntryCloseButton(){
        await this.panelentryclosebutton.click();
    }

    async clickPanelEntryStartJudgingButton(){
        await this.panelentrystartjudgingbutton.click();
    }

    async clickPanelEntryWorkViewButton(){
        await this.panelentryviewbutton.click();
        
    }

    async getPanelEntryCount(){
        const panelWorkCount = await this.panelentryworkroundsrowcount.count();
        console.log('Panel Work Count: ' + panelWorkCount);
        return panelWorkCount;
    }
}