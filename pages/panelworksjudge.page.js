import test, { expect } from 'playwright/test';
const panelsWorkJudgeObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/panelworkjudgeobjectelement.json')));

exports.PanelsWorkJudgePage = class PanelsWorkJudgePage{
    constructor(page){
        this.page=page;
        this.panelworksjudgedcontent=page.locator(panelsWorkJudgeObjLocator.panelworksjudgedcontent);
        this.panelworksjudgednextroundbutton=page.locator(panelsWorkJudgeObjLocator.panelworksjudgednextroundbutton);
        this.panelworksjudgedsaveclosebutton=page.locator(panelsWorkJudgeObjLocator.panelworksjudgedsaveclosebutton);
        this.panelworksjudgedpromotedemotebutton=page.locator(panelsWorkJudgeObjLocator.panelworksjudgedpromotedemotebutton);
        this.panelworksstatusdropdown=page.locator(panelsWorkJudgeObjLocator.panelworksstatusdropdown);
        this.panelworkfinishbutton=page.locator(panelsWorkJudgeObjLocator.panelworkfinishbutton);
        this.panelworkfinishdialogbutton=page.locator(panelsWorkJudgeObjLocator.panelworkfinishdialogbutton);
    }

    async verifyWorkJudgePage(){
        await Promise.all([
            this.panelworksjudgedcontent.waitFor().then(()=>true),
            await expect(this.panelworksjudgedcontent).toBeVisible({timeout:10000}),          
        ]).catch((error) => {
            throw new error("Panels Entry Works Judge page not Displayed");
        });
    }

    async clickNextRoundButton(){
        await this.panelworksjudgednextroundbutton.click();
    }

    async clickSaveCloseButton(){
        await this.panelworksjudgedsaveclosebutton.click();
    }

    async clickPromoteDemoteButton(){
        await this.panelworksjudgedpromotedemotebutton.click();
    }

    async getAdvanceWorkCount(){
        const advanceWorkCount=await this.page.locator("(//p[@class='chakra-text css-z89dvq'])[1]").textContent();
        return parseInt(advanceWorkCount);

    }

    async clickWorkStatusDropdown(workStatusOption){
       
        const workStatusDropdowncount = await this.panelworksstatusdropdown.count();
        const advanceWorkCount=await this.page.locator("(//p[@class='chakra-text css-z89dvq'])[1]").textContent();
        const notAdvanceWorkCount=await this.page.locator("(//p[@class='chakra-text css-z89dvq'])[2]").textContent();
        const totalWorkCount =parseInt(advanceWorkCount) + parseInt(notAdvanceWorkCount);
        
        for(let i=1;i<=totalWorkCount;++i){
            const dropdownValue=await this.page.locator(`//tr[${i}]/td[4]/p/div/select`).textContent();
            await this.page.locator(`//tr[${i}]/td[4]/p/div/select`).waitFor({ state: 'visible' });
            await this.page.locator(`//tr[${i}]/td[4]/p/div/select`).click();
            await this.page.locator(`//tr[${i}]/td[4]/p/div/select`).selectOption(workStatusOption);
            await this.page.locator(`//tr[${i}]/td[4]/p/div/select`).waitFor({ state: 'visible' });
        }
         
    }

    // async selectWorkStatusDropdown(workStatusOption){
    //     await this.panelworksstatusdropdown.selectOption(workStatusOption);
    // }

    async getJudgedWorkedStatusDropdownCount(){
        const judgeWorkStatusDropdownCount = await this.panelworksstatusdropdown.count();
        console.log('Judge Work Status Dropdown Count: ' + judgeWorkStatusDropdownCount);
        return judgeWorkStatusDropdownCount;
    }

    async clickJudgeWorkFinishButton(){
        await this.panelworkfinishbutton.waitFor({ state: 'visible' });
        await this.panelworkfinishbutton.click();  
        // await Promise.all([
        //     this.panelworkfinishbutton.waitFor().then(()=>true),
        //     await this.panelworkfinishbutton.click(),          
        // ]).catch((error) => {
        //     throw new error("Panels Entry Works Judge page Finish button not Displayed");
        // });
    }

    async clickJudgeWorkFinishDialogButton(){
        await Promise.all([
            this.panelworkfinishdialogbutton.waitFor().then(()=>true),
            await this.panelworkfinishdialogbutton.click(),          
        ]).catch((error) => {
            throw new error("Panels Entry Works Judge Finish Dialog Button Displayed");
        });
    }
}