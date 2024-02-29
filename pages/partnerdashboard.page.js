import test, { expect } from 'playwright/test';
const partnerDashboardObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/partnerdashboardobjectelement.json')));

exports.PartnerDashboardPage = class PartnerDashboardPage{
    constructor(page){
        this.page=page;
        this.partnerdashboardheadertext=page.locator(partnerDashboardObjLocator.partnerdashboardheadertext);
        this.partnerdashboardartentriescontent=page.locator(partnerDashboardObjLocator.partnerdashboardartentriescontent);
        this.partnerdashboardpanelbutton=page.getByRole('button', { name: partnerDashboardObjLocator.partnerdashboardpanelbutton });
        this.partnerdashboardmenubutton=page.locator(partnerDashboardObjLocator.partnerdashboardmenubutton);
        this.partnerdashboardjudgesbutton=page.getByRole('button', { name: partnerDashboardObjLocator.partnerdashboardjudgesbutton });
    }
async verifyPartnerDashboard(){
    await this.page.waitForLoadState('networkidle'); 
    await Promise.all([
        this.partnerdashboardheadertext.waitFor().then(()=>true),
        this.partnerdashboardartentriescontent.waitFor().then(()=>true),
        await expect(this.partnerdashboardheadertext).toBeVisible({timeout:10000}),
        await expect(this.partnerdashboardartentriescontent).toBeVisible(),
    ]).catch((error) => {
        throw new error("Partner Dashboard Page not Displayed");
    });
}

async clickOnMenuDropDown(){
    await this.partnerdashboardmenubutton.click();
}

async selectPartnerDashboardMenuItems(menuItems){
    await this.page.getByRole('menuitem', { name: menuItems }).click();
    await this.verifyPartnerDashboard();
}

async clickPanelsLink(){
    await this.partnerdashboardpanelbutton.click();
    //await this.page.waitForURL('**/partners/panels?**');
}

async clickJudgesLink(){
    await this.partnerdashboardjudgesbutton.click();
    
}
    
}