import test, { expect } from 'playwright/test';
const adminUserDashboardObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/adminuserdashboardobjectelement.json')));

exports.AdminUserDashboardPage=class AdminUserDashboardPage{
    constructor(page){
        this.page=page;
        this.allpartnerslink=page.getByRole('button', { name: adminUserDashboardObjLocator.allpartnerslink });
        this.categorieslink=page.getByRole('button', { name: adminUserDashboardObjLocator.categorieslink });
        this.alluserslink=page.getByRole('button', { name: adminUserDashboardObjLocator.alluserslink });
        this.testdatalink=page.getByRole('button', { name: adminUserDashboardObjLocator.testdatalink });
    }

    async clickAllPartnersLink(){
        await Promise.any([
            this.allpartnerslink.waitFor().then(()=>true),
            await this.allpartnerslink.click(),
        ]).catch((error) => {
            throw new error("All Partners not Displayed");
        });
        
    }

    async clickCategoriesLink(){
        await Promise.any([
            this.categorieslink.waitFor().then(()=>true),
            await this.categorieslink.click(),
        ]).catch((error) => {
            throw new error("Categories link not Displayed");
        });
        
    }

    async clickAllUsersLink(){
        await Promise.any([
            this.alluserslink.waitFor().then(()=>true),
            await this.alluserslink.click(),
        ]).catch((error) => {
            throw new error("All Users link not Displayed");
        });
        
    }

    async clickTestDataLink(){
        await Promise.any([
            this.testdatalink.waitFor().then(()=>true),
            await this.testdatalink.click(),
        ]).catch((error) => {
            throw new error("Test Data link not Displayed");
        });
        
    }
}