import test, { expect } from 'playwright/test';
const generatePanelObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/generatepanelsobjectelement.json')));

exports.GeneratePanelPage = class GeneratePanelPage{
    constructor(page){
        this.page=page;
        this.panelcontent=page.locator(generatePanelObjLocator.panelcontent);
        this.panelcontentcheckbox=page.locator(generatePanelObjLocator.panelcontentcheckbox);
        this.panelcontentfirstcheckbox=page.locator(generatePanelObjLocator.panelcontentfirstcheckbox);
        this.panelcontentsecondcheckbox=page.locator(generatePanelObjLocator.panelcontentsecondcheckbox);
        this.generatepanelbutton=page.locator(generatePanelObjLocator.generatepanelbutton);
        this.panelrowcount=page.locator(generatePanelObjLocator.panelrowcount);
        
    }

    async verifyGeneratePanelPage(){
        await this.panelcontent.waitFor({ state: 'visible' });
        await expect(this.panelcontent).toBeVisible(); 
    }

    async clickGeneratePanelButton(){
        await this.generatepanelbutton.click();
    }

    async clickGeneratePanelCheckbox(){
        const panelRowCount= await this.panelrowcount.count();
        let minNumber =2;
        let maxNumber =3;

        for(let i=1;i<=panelRowCount;++i){    
            let randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;  
            let isCheckboxVisible = await this.page.locator(`//*[@id="table"]/tbody/tr[${i}]/td[2]/label`).isVisible();
            if(isCheckboxVisible){
                if (i % 2 == 0){ 
                    await this.page.locator(`//*[@id="table"]/tbody/tr[${i}]/td[${randomNumber}]/label/span`).click(); 
                }else{
                    await this.page.locator(`//*[@id="table"]/tbody/tr[${i}]/td[${randomNumber}]/label/span`).click();
                }  
            }
        }
    }
}