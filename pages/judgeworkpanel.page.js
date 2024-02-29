import test, { expect } from 'playwright/test';
const judgeWorkPanelObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/judgeworkpanelobjectelement.json')));

exports.JudgeWorkPanelPage = class JudgeWorkPanelPage{
    constructor(page){
        this.page=page;
        this.judgeworkpanelcontent=page.locator(judgeWorkPanelObjLocator.judgeworkpanelcontent);
        this.judgeworkpanelexitbutton=page.locator(judgeWorkPanelObjLocator.judgeworkpanelexitbutton);
        this.judgeworkbutton=page.locator(judgeWorkPanelObjLocator.judgeworkbutton);  
        this.judgeworkpanelheadercontent=page.locator(judgeWorkPanelObjLocator.judgeworkpanelheadercontent); 
        this.judgeworkcount=page.locator(judgeWorkPanelObjLocator.judgeworkcount);
        this.continuejudgingbutton=page.locator(judgeWorkPanelObjLocator.continuejudgingbutton);
             
    }

    async verifyJudgeWorkPanelPage(){
        await this.page.waitForLoadState('networkidle');
        await this.judgeworkpanelheadercontent.waitFor({ state: 'visible' });
        await expect(this.judgeworkpanelheadercontent).toBeVisible();
        const allJudgeWorkContent= await this.judgeworkpanelcontent.all();
        for (const judgeWorkContent of allJudgeWorkContent) {
            const isVisible = await judgeWorkContent.isVisible();
            if (isVisible) {
              await expect(judgeWorkContent).toBeVisible();
              //break;
            }
          }
    }

    async getJudgeWorkCount(){
      let rightworkCountText = await this.judgeworkcount.textContent();
      let leftWorkCount = 0;
      let rightWorkCount = 0;
      if(rightworkCountText.indexOf("/") > -1){
        let splittedVal = rightworkCountText.split("/");
         leftWorkCount = splittedVal[0].trim();
         rightWorkCount = splittedVal[1].trim();
         console.log('leftWorkCount ' + leftWorkCount + ' rightWorkCount ' + rightWorkCount);
      }
      var totalWorkCount = parseInt(rightWorkCount)-parseInt(leftWorkCount);
      console.log('Total Work Count ' + totalWorkCount);
      return totalWorkCount;
    }

    async getInitialJudgeWorkCount(){
      let rightworkCountText = await this.judgeworkcount.textContent();
      let leftWorkCount = 0;
      let rightWorkCount = 0;
      if(rightworkCountText.indexOf("/") > -1){
        let splittedVal = rightworkCountText.split("/");
         leftWorkCount = splittedVal[0].trim();
         rightWorkCount = splittedVal[1].trim();
         console.log('leftWorkCount ' + leftWorkCount + ' rightWorkCount ' + rightWorkCount);
      }
      //var totalWorkCount = parseInt(rightWorkCount)-parseInt(leftWorkCount);
      //console.log('Total Work Count ' + rightWorkCount);
      return rightWorkCount;
    }

    async clickContinueJudgingButton(){
        await this.continuejudgingbutton.click(); 
      
      
    }

    async clickJudgeWorkButton(){
      console.log('judge work button visible call');
      await this.judgeworkbutton.first().click();
      // const startJudgeWorkButton = await this.judgeworkbutton.count();

      // for (let i = 0; i < count; ++i){

      // }
      //   // let clicked = false;
      //   for (const button of await this.judgeworkbutton.all()) {
      //       await button.click();
      //       const isVisible = await button.isVisible();
      //       console.log('judge work button visible ' + isVisible);
      //       if (isVisible) {
      //         // Click on the first visible button and break the loop
      //         await button.click();
      //         await this.page.waitForNavigation();
      //         //clicked = true;
      //         break;
      //       }
      //     }
    }

    async clickExitJudgeWorkButton(){
      await this.judgeworkpanelexitbutton.click();
    }
}