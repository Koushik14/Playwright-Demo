import test, { expect } from 'playwright/test';
const judgemanagementObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/judgemanagementobjectelement.json')));

exports.JudgeManagementPage = class JudgeManagementPage{
    constructor(page){
        this.page=page;
        this.judgemanagementpageheader=page.locator(judgemanagementObjLocator.judgemanagementpageheader);
        this.judgecontent=page.locator(judgemanagementObjLocator.judgecontent);
        this.judgeimpersonate=page.locator(judgemanagementObjLocator.judgeimpersonate);       
    }

    async verifyJudgeManagementPage(){
        await this.judgemanagementpageheader.waitFor({ state: 'visible' });
        await this.judgecontent.waitFor({ state: 'visible' });
        await expect(this.judgemanagementpageheader).toBeVisible(); 
        await expect(this.judgecontent).toBeVisible();  
    }

    async clickJudgeImpersonateButton(){
        const judgeImpersonateButton=await this.judgeimpersonate.all();
        let clicked = false;
        for (const button of judgeImpersonateButton) {
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