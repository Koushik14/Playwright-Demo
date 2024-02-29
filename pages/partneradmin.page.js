import test, { expect } from 'playwright/test';
const partnerAdminObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/partneradminsobjectelement.json')));

exports.PartnerAdminPage = class PartnerAdminPage{
    constructor(page){
        this.page=page;
        this.partneradminheadertext=page.locator(partnerAdminObjLocator.partneradminheadertext);
        this.partneradmindatatableheadertext=page.getByText(partnerAdminObjLocator.partneradmindatatableheadertext);
        this.partneradmindatatablecontent=page.locator(partnerAdminObjLocator.partneradmindatatablecontent);
        this.partneradminjudgedatatablecontent=page.locator(partnerAdminObjLocator.partneradminjudgedatatablecontent);
        this.partneradminimpersonatedialogbutton=page.getByRole('button', { name: partnerAdminObjLocator.partneradminimpersonatedialogbutton });
    }

    async verifyPartnerAdminPage(){
        await this.page.waitForLoadState('networkidle'); 
        await expect(this.partneradminheadertext).toBeVisible();
        await expect(this.partneradmindatatableheadertext).toBeVisible();
        await Promise.all([
            this.partneradmindatatablecontent.waitFor().then(()=>true),
            this.partneradminjudgedatatablecontent.waitFor().then(()=>true),
            await expect(this.partneradmindatatablecontent).toBeVisible(),
            await expect(this.partneradminjudgedatatablecontent).toBeVisible(),
        ]).catch((error) => {
            throw new error("Partners Admins Data not Displayed");
        });

               
       
    }

    async clickImpersonateButton(partnerAdminNameEmail){
        await Promise.any([
            this.page.getByRole('row', { name: partnerAdminNameEmail }).getByLabel('impersonate user, button').waitFor().then(()=>true),
            await this.page.getByRole('row', { name: partnerAdminNameEmail }).getByLabel('impersonate user, button').click(),        
        ]).catch((error) => {
            throw new error("Impersonate Button Not Displayed");
        });

       // await this.page.getByRole('row', { name: partnerAdminNameEmail }).getByLabel('impersonate user, button').click();
    }

    async clickImpersonateDialogButton(){
        await Promise.any([
            this.partneradminimpersonatedialogbutton.waitFor().then(()=>true),
            this.partneradminimpersonatedialogbutton.click(),
            this.page.waitForNavigation(),        
        ]).catch((error) => {
            throw new error("Impersonate Dialog Button Not Displayed");
        });

       // await this.page.getByRole('row', { name: partnerAdminNameEmail }).getByLabel('impersonate user, button').click();
    }

}