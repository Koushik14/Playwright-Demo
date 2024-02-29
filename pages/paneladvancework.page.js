import test, { expect } from 'playwright/test';
const panelsAdvanceWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/panelentryadvanceworkobjectelement.json')));

exports.PanelEntryAdvanceWorkPage = class PanelEntryAdvanceWorkPage{
    constructor(page){
        this.page=page;
        this.workpaneldisplay=page.locator(panelsAdvanceWorkObjLocator.workpaneldisplay);
        this.workpaneladvanceworkbutton=page.locator(panelsAdvanceWorkObjLocator.workpaneladvanceworkbutton);
        this.workpaneldonotadvanceworkbutton=page.locator(panelsAdvanceWorkObjLocator.workpaneldonotadvanceworkbutton);
        this.workpaneladvanceportfolioworkbutton=page.locator(panelsAdvanceWorkObjLocator.workpaneladvanceportfolioworkbutton);
    }

    async verifyPanelEntryAdvanceWorkPage(){
        await Promise.all([
            this.workpaneldisplay.waitFor().then(()=>true),
            await expect(this.workpaneldisplay).toBeVisible(),          
        ]).catch((error) => {
            throw new error("Panels Entry Advance Work page not Displayed");
        });
    }

    async isAdvanceWorkButtonVisible() {
        await this.workpaneladvanceworkbutton.waitFor({ state: 'visible' });
        return await this.workpaneladvanceworkbutton.isVisible();
    }

    async clickAdvanceThisWorkButton(){
        const visible = this.isAdvanceWorkButtonVisible();
        console.log('Advance button Visible ' + visible);
            if (visible) {
              // Click on the first visible button and break the loop
              await this.workpaneladvanceworkbutton.click();       
            } else {
            await this.workpaneladvanceportfolioworkbutton.click();
            }
          }
          
    
    async clickDoNotAdvanceThisWorkButton(){
        await this.workpaneldonotadvanceworkbutton.click();
    }
}