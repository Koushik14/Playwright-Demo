import test, { expect } from 'playwright/test';
const partnersObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/adminuserpartnersobjectelement.json')));

exports.PartnersPage=class PartnersPage{
    constructor(page){
        this.page=page;
        this.allpartnersheadertext=page.locator(partnersObjLocator.allpartnersheadertext);
    }

    async verifyAllPartners(){
        await this.page.waitForLoadState('networkidle');
        await Promise.any([
            this.allpartnersheadertext.waitFor().then(()=>true),
            await expect(this.allpartnersheadertext).toBeVisible(),
        ]).catch((error) => {
            throw new error("All Partners Page not Displayed");
        });
        
    }

    async clickPartnerLink(partnerLinkName){
        await this.page.getByRole('link', { name: partnerLinkName }).click();
    }
}