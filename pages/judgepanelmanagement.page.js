import test, { expect } from 'playwright/test';
const judgepanelmanagementObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/judgemanagementpanelobjectelement.json')));

exports.JudgePanelManagementPage = class JudgePanelManagementPage{
    constructor(page){
        this.page=page;
        this.judgepanelmanagementheader=page.locator(judgepanelmanagementObjLocator.judgepanelmanagementheader);
        this.judgetotalpanelscontent=page.locator(judgepanelmanagementObjLocator.judgetotalpanelscontent);
        this.judgepanelcontenttable=page.locator(judgepanelmanagementObjLocator.judgepanelcontenttable);
        this.judgepanelcontinuebutton=page.locator(judgepanelmanagementObjLocator.judgepanelcontinuebutton);        
    }

    async verifyJudgePanelManagementPage(){
        await this.judgepanelmanagementheader.waitFor({ state: 'visible' });
        await this.judgetotalpanelscontent.waitFor({ state: 'visible' });
        await this.judgepanelcontenttable.waitFor({ state: 'visible' });     
        await expect(this.judgepanelmanagementheader).toBeVisible(); 
        await expect(this.judgetotalpanelscontent).toBeVisible();  
        await expect(this.judgepanelcontenttable).toBeVisible();  
    }

    async clickJudgePanelManagementContinueButton(){
       
        const startContinueJudgingButton=await this.judgepanelcontinuebutton.all();
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