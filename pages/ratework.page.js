import test, { expect } from 'playwright/test';
const rateWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/rateworkobjectelement.json')));

exports.RateWorkPage = class RateWorkPage{
    constructor(page){
        this.page=page;
        this.rateworktext=page.locator(rateWorkObjLocator.rateworktext);
        this.workcontent=page.locator(rateWorkObjLocator.workcontent);
        this.rateworkcontent=page.locator(rateWorkObjLocator.rateworkcontent);  
        this.rateworksaveclosebutton=page.locator(rateWorkObjLocator.rateworksaveclosebutton); 
        this.rateworknextworkbutton=page.locator(rateWorkObjLocator.rateworknextworkbutton);     
    }

    async verifyRateWorkPage(){
        await this.rateworktext.waitFor({ state: 'visible' });
        await this.workcontent.waitFor({ state: 'visible' });
        await this.rateworkcontent.waitFor({ state: 'visible' });
        await this.rateworknextworkbutton.waitFor({ state: 'visible' });
        await expect(this.rateworktext).toBeVisible({timeout:30000});
        await expect(this.workcontent).toBeVisible();
        await expect(this.rateworkcontent).toBeVisible();
        await expect(this.rateworknextworkbutton).toBeVisible();
    }

    async clickRateWorkRating(enterWorkRating){ 
        await this.page.locator(`(//button[text()='${enterWorkRating}'])[1]`).waitFor({ state: 'visible' });      
        await this.page.locator(`(//button[text()='${enterWorkRating}'])[1]`).click();
        
    }

    async clickNextWorkButton(){
        await this.rateworknextworkbutton.waitFor({ state: 'visible' });
        await this.rateworknextworkbutton.click();
        await this.page.waitForURL('**/rate/**');
        await this.page.waitForNavigation({timeout:20000});
       
    }

}