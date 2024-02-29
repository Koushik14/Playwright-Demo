import test, { expect } from 'playwright/test';
const finishWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/finishworkpanelobjectelement.json')));

exports.FinishWorkPage = class FinishWorkPage{
    constructor(page){
        this.page=page;
        this.finishpanelbutton=page.locator(finishWorkObjLocator.finishpanelbutton);
           
    }

    async clickFinishPanelButton(){
        await this.finishpanelbutton.click();
    }
}