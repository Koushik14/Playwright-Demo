import test, { expect } from 'playwright/test';
const panelsObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/panelsobjectelment.json')));

exports.PanelsStartJudgingPage = class PanelsStartJudgingPage{
    constructor(page){
        this.page=page;
        this.panelmanagementheadertext=page.locator(panelsObjLocator.panelmanagementheadertext);
        this.panelmanagementcontent=page.locator(panelsObjLocator.panelmanagementcontent);
        this.panelawarddistributioncontent=page.locator(panelsObjLocator.panelawarddistributioncontent);
        this.panelsstartjudginbutton=page.locator(panelsObjLocator.panelsstartjudginbutton);
        this.panelstartjudgingcontinuebutton=page.getByRole('button', { name: panelsObjLocator.panelstartjudgingcontinuebutton });
        this.panelawarddistributioncontentfirstcell=page.locator(panelsObjLocator.panelawarddistributioncontentfirstcell);
    }

    
    async verifyStartJudgingPage(){
            await Promise.all([
            this.panelmanagementheadertext.waitFor().then(()=>true),
            this.panelmanagementcontent.waitFor().then(()=>true),
            this.panelawarddistributioncontent.waitFor().then(()=>true),
            this.panelawarddistributioncontentfirstcell.waitFor().then(()=>true),
            await expect(this.panelmanagementheadertext).toBeVisible(),
            await expect(this.panelmanagementcontent).toBeVisible(),
            await expect(this.panelawarddistributioncontent).toBeVisible(),
            await expect(this.panelawarddistributioncontentfirstcell).toBeVisible(),
        ]).catch((error) => {
            throw new error("Panels Start Judging page not Displayed");
        });
    }

    async clickStartJudgingButton(){
        const startJudgingButton=await this.panelsstartjudginbutton.all();
        let clicked = false;
        for (const button of startJudgingButton) {
            const isVisible = await button.isVisible();
            if (isVisible) {
              // Click on the first visible button and break the loop
              await button.click();
              clicked = true;
              break;
            }
          }
    }

    async clickContinueDialogButton(){
      await this.panelstartjudgingcontinuebutton.click();
      await this.page.waitForNavigation();
    }

    async clickStartJudgingContinueButton(){
        const continueButtonVisible=await this.panelstartjudgingcontinuebutton.isVisible();
        console.log('continue button visible ' + continueButtonVisible);
        if(continueButtonVisible){
        const startContinueJudgingButton=await this.panelstartjudgingcontinuebutton.all();
        let clicked = false;
        for (const button of startContinueJudgingButton) {
            const isVisible = await button.isVisible();
            if (isVisible) {
              // Click on the first visible button and break the loop
              await button.click();
              clicked = true;
              break;
            }
          }
        }
        
    }
}