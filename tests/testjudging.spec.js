const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import { SignInPage } from '../pages/signin.page';
import { MyAccountPage } from '../pages/myaccount.page';
import { ManageWorkPage } from '../pages/managework.page';
import { UploadWorkPage } from '../pages/manageworkuploadwork.page';
import { CashAwards } from '../pages/manageworkcashawards.page';
import { WorkReviewPage } from '../pages/manageworkreview.page';
import { PayNowDialog } from '../pages/manageworkpaynow.dialog';
import { PaymentPage } from '../pages/manageworkpayment.page';
import { CheckoutStripe } from '../pages/checkoutstripe.page';
import { allure } from "allure-playwright";
import * as csv from 'fs'
import { path } from 'path';
import { parse } from 'csv-parse/sync';
import { SearchPage } from '../pages/search.page';
import { AdminUserDashboardPage } from '../pages/adminuserdashboard.page';
import { PartnersPage } from '../pages/partners.page';
import { PartnerAdminPage } from '../pages/partneradmin.page';
import { PartnerDashboardPage } from '../pages/partnerdashboard.page';
import { PanelsStartJudgingPage } from '../pages/panelstartjudging.page';
import { PanelsEntryPage } from '../pages/panelentry.page';
import { PanelEntryAdvanceWorkPage } from '../pages/paneladvancework.page';
import { PanelsWorkJudgePage } from '../pages/panelworksjudge.page';
import { GeneratePanelPage } from '../pages/generatepanel.page';
import { JudgeManagementPage } from '../pages/judgemanagement.page';
import { JudgePanelManagementPage } from '../pages/judgepanelmanagement.page';
import { JudgeWorkPanelPage } from '../pages/judgeworkpanel.page';
import { RateWorkPage } from '../pages/ratework.page';
import { FinishWorkPage } from '../pages/finishworkpanel.page';


const logindata = JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata = JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata = JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));
const searchdata = JSON.parse(JSON.stringify(require('../testdata/searchdata.json')));
const partnername = JSON.parse(JSON.stringify(require('../testdata/partnername.json')));
const partneradmindata = JSON.parse(JSON.stringify(require('../testdata/partneradmindata.json')));
const partnerdashboarddata = JSON.parse(JSON.stringify(require('../testdata/partnerdashboarddata.json')));
const panelworkstatus = JSON.parse(JSON.stringify(require('../testdata/judgedworkstatusdropdowndata.json')));
const workrating = JSON.parse(JSON.stringify(require('../testdata/workrating.json')));

const loginCSV = parse(csv.readFileSync('./testdata/logindata.csv', 'utf-8'), {
    columns: true,
    skip_empty_lines: true
});

test.describe("Art & Writing Site", () => {

    test.beforeEach(async ({ page, isMobile }) => {
        test.slow();
        const loginPage = new SignInPage(page);
        await loginPage.signPage();
        await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
        //Login using JSON file data
        //await loginPage.login(logindata.userName,logindata.Password);
        //Login using CSV Data File
        //console.log(isMobile)
        for (const csvLoginData of loginCSV) {
            if (isMobile == false) {
                await loginPage.superAdminUserlogin(csvLoginData.superAdminUserName, csvLoginData.superUserPassword);
            }
            else {
                await loginPage.superAdminUserlogin(csvLoginData.superAdminUserName, csvLoginData.superUserPassword);
            }

        }

    })

    test("Verify user able to login as admin user and navigate to All Partners Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await page.screenshot({ path: './screenshots/AllPartnersPage.png', fullPage: true });

    })

    test("Verify user able to navigate Partners Admin Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        await page.screenshot({ path: './screenshots/PartnersAdminPage.png', fullPage: true });

    })

    test("Verify user able to navigate Partners Dashboard Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await page.screenshot({ path: './screenshots/PartnersDashboardPage.png', fullPage: true });

    })

    test("Verify user able to navigate Panels Start Judging Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.verifyStartJudgingPage();
        await page.screenshot({ path: './screenshots/PanelsStartJudgingPage.png', fullPage: true });

    })

    test("Verify user able to navigate Panels Entry Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.verifyStartJudgingPage();
        await panelsStartJudgingPage.clickStartJudgingButton();
        await panelsStartJudgingPage.clickStartJudgingContinueButton();
        const panelsEntryPage = new PanelsEntryPage(page);
        await panelsEntryPage.verifyPanelEntryPage();
        await page.screenshot({ path: './screenshots/PanelsEntryPage.png', fullPage: true });

    })

    test("Verify user able to navigate Panels Entry Advance Work Page", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.verifyStartJudgingPage();
        await panelsStartJudgingPage.clickStartJudgingButton();
        await panelsStartJudgingPage.clickStartJudgingContinueButton();
        const panelsEntryPage = new PanelsEntryPage(page);
        await panelsEntryPage.verifyPanelEntryPage();
        let panelWorkCount = await panelsEntryPage.getPanelEntryCount();
        //console.log('Test Page Panel Work Count: ' + panelWorkCount);
        await panelsEntryPage.clickPanelEntryWorkViewButton();
        const advanceWorkPage = new PanelEntryAdvanceWorkPage(page);
        while (panelWorkCount > 0) {
            await advanceWorkPage.clickAdvanceThisWorkButton();
            await advanceWorkPage.verifyPanelEntryAdvanceWorkPage();
            panelWorkCount = panelWorkCount - 1;
        }
        await page.screenshot({ path: './screenshots/PanelsEntryAdvanceWorkPage.png', fullPage: true });

    })

    test("Verify user able to navigate Panels Entry Work Judge Page", async ({ page }) => {
        test.slow();
        test.setTimeout(120000);
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.verifyStartJudgingPage();
        await panelsStartJudgingPage.clickStartJudgingButton();
        await panelsStartJudgingPage.clickStartJudgingContinueButton();
        const panelsEntryPage = new PanelsEntryPage(page);
        await panelsEntryPage.verifyPanelEntryPage();
        let panelWorkCount = await panelsEntryPage.getPanelEntryCount();
        //console.log('Test Page Panel Work Count: ' + panelWorkCount);
        await panelsEntryPage.clickPanelEntryWorkViewButton();
        const advanceWorkPage = new PanelEntryAdvanceWorkPage(page);
        while (panelWorkCount > 0) {
            await advanceWorkPage.clickAdvanceThisWorkButton();
            await advanceWorkPage.verifyPanelEntryAdvanceWorkPage();
            panelWorkCount = panelWorkCount - 1;
        }

        const panelsWorkJudgePage = new PanelsWorkJudgePage(page);
        await panelsWorkJudgePage.verifyWorkJudgePage();
        await panelsWorkJudgePage.clickWorkStatusDropdown(panelworkstatus.notAdvance);
        await panelsWorkJudgePage.clickJudgeWorkFinishButton();
        await panelsWorkJudgePage.clickJudgeWorkFinishDialogButton();
        await panelsStartJudgingPage.verifyStartJudgingPage();

        await page.screenshot({ path: './screenshots/PanelsEntryWorkJudgeFinishPage.png', fullPage: true });

    })

    test("Verify user able to Finish Judge Work By Clicking Continue Button", async ({ page }) => {
        test.slow();
        //test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.verifyStartJudgingPage();
        await panelsStartJudgingPage.clickStartJudgingContinueButton();
        const panelsWorkJudgePage = new PanelsWorkJudgePage(page);
        await panelsWorkJudgePage.verifyWorkJudgePage();
        const advanceWorkCount = panelsWorkJudgePage.getAdvanceWorkCount();
        console.log('test adv work count ' + advanceWorkCount);
        if(advanceWorkCount>=0){
            
            await panelsWorkJudgePage.clickWorkStatusDropdown(panelworkstatus.notAdvance);
        }else{
            await panelsWorkJudgePage.clickJudgeWorkFinishButton();
            await panelsWorkJudgePage.clickJudgeWorkFinishDialogButton();
            await panelsStartJudgingPage.verifyStartJudgingPage();
        }
        await page.screenshot({ path: './screenshots/PanelsEntryContinuePage.png', fullPage: true });

    })

    test("Verify user able to generate panels", async ({ page }) => {
        test.slow();
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        await partnerDashboardPage.clickOnMenuDropDown();
        await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.menuItems);
        await partnerDashboardPage.clickPanelsLink();
        const generatePanelPage = new GeneratePanelPage(page);
        await generatePanelPage.verifyGeneratePanelPage();
        await generatePanelPage.clickGeneratePanelCheckbox();
        await generatePanelPage.clickGeneratePanelButton();
        await page.screenshot({ path: './screenshots/GeneratePanelPage.png', fullPage: true });
    })

    test("Verify user able to Impersonate Judge from Judge Management Page", async ({ page }) => {
        test.slow();
        //test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        // await partnerDashboardPage.clickOnMenuDropDown();
        // await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.workmenuItems);
        await partnerDashboardPage.clickJudgesLink();
        const judgeManagementPage = new JudgeManagementPage(page);
        await judgeManagementPage.verifyJudgeManagementPage();
        await judgeManagementPage.clickJudgeImpersonateButton();
        await partnerAdminPage.clickImpersonateDialogButton();
        await page.screenshot({ path: './screenshots/JudgeManagementPage.png', fullPage: true });

    })

    test("Verify user able to Start Judging for work", async ({ page }) => {
        test.slow();
        //test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        // await partnerDashboardPage.clickOnMenuDropDown();
        // await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.workmenuItems);
        await partnerDashboardPage.clickJudgesLink();
        const judgeManagementPage = new JudgeManagementPage(page);
        await judgeManagementPage.verifyJudgeManagementPage();
        await judgeManagementPage.clickJudgeImpersonateButton();
        await partnerAdminPage.clickImpersonateDialogButton();
        const judgePanelManagementPage = new JudgePanelManagementPage(page);
        await judgePanelManagementPage.verifyJudgePanelManagementPage();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.clickStartJudgingButton();

        await page.screenshot({ path: './screenshots/JudgePanelManagementPage.png', fullPage: true });

    })

    test("Verify user able to Start Judging for Work Panel", async ({ page }) => {
        test.slow();
        //test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        // await partnerDashboardPage.clickOnMenuDropDown();
        // await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.workmenuItems);
        await partnerDashboardPage.clickJudgesLink();
        const judgeManagementPage = new JudgeManagementPage(page);
        await judgeManagementPage.verifyJudgeManagementPage();
        await judgeManagementPage.clickJudgeImpersonateButton();
        await partnerAdminPage.clickImpersonateDialogButton();
        const judgePanelManagementPage = new JudgePanelManagementPage(page);
        await judgePanelManagementPage.verifyJudgePanelManagementPage();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.clickStartJudgingButton();
        await panelsStartJudgingPage.clickContinueDialogButton();
        const judgeWorkPanelPage = new JudgeWorkPanelPage(page);
        await judgeWorkPanelPage.verifyJudgeWorkPanelPage();
        
        await page.screenshot({ path: './screenshots/JudgeWorkPanelPage.png', fullPage: true });

    })

    test("Verify user able to Finish Work Judging", async ({ page }) => {
        test.slow();
        test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        // await partnerDashboardPage.clickOnMenuDropDown();
        // await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.workmenuItems);
        await partnerDashboardPage.clickJudgesLink();
        const judgeManagementPage = new JudgeManagementPage(page);
        await judgeManagementPage.verifyJudgeManagementPage();
        await judgeManagementPage.clickJudgeImpersonateButton();
        await partnerAdminPage.clickImpersonateDialogButton();
        const judgePanelManagementPage = new JudgePanelManagementPage(page);
        await judgePanelManagementPage.verifyJudgePanelManagementPage();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        await panelsStartJudgingPage.clickStartJudgingButton();
        await panelsStartJudgingPage.clickContinueDialogButton();
        const judgeWorkPanelPage = new JudgeWorkPanelPage(page);
        await judgeWorkPanelPage.verifyJudgeWorkPanelPage();
        let workCount = await judgeWorkPanelPage.getInitialJudgeWorkCount();
        await judgeWorkPanelPage.clickJudgeWorkButton();
        const rateWorkPage = new RateWorkPage(page);
        await rateWorkPage.verifyRateWorkPage();
        //await rateWorkPage.clickRateWorkRating(workrating.workRating);
        while (workCount > 1) {
            console.log('before click while loop ' + workCount)
            await rateWorkPage.clickRateWorkRating(workrating.workRating);
            await rateWorkPage.clickNextWorkButton();
            await rateWorkPage.verifyRateWorkPage();
           
            workCount = workCount-1;
            console.log('while loop ' + workCount)
        }

        
        const panelsWorkJudgePage = new PanelsWorkJudgePage(page);
        await panelsWorkJudgePage.verifyWorkJudgePage();
        const finishWorkPage = new FinishWorkPage(page);
        await finishWorkPage.clickFinishPanelButton();
        await panelsWorkJudgePage.clickSaveCloseButton();
        await judgePanelManagementPage.verifyJudgePanelManagementPage();


        
        await page.screenshot({ path: './screenshots/FinishWorkPanelPage.png', fullPage: true });

    })

    test("Verify user able to Finish Work Judging with Continue", async ({ page }) => {
        test.slow();
        test.setTimeout(120000); 
        const adminUserDashboardPage = new AdminUserDashboardPage(page);
        await adminUserDashboardPage.clickAllPartnersLink();
        const allPartnersPage = new PartnersPage(page);
        await allPartnersPage.verifyAllPartners();
        await allPartnersPage.clickPartnerLink(partnername.partnerName);
        const partnerAdminPage = new PartnerAdminPage(page);
        await partnerAdminPage.verifyPartnerAdminPage();
        await partnerAdminPage.clickImpersonateButton(partneradmindata.partnerAdminNameEmail);
        await partnerAdminPage.clickImpersonateDialogButton();
        const partnerDashboardPage = new PartnerDashboardPage(page);
        await partnerDashboardPage.verifyPartnerDashboard();
        // await partnerDashboardPage.clickOnMenuDropDown();
        // await partnerDashboardPage.selectPartnerDashboardMenuItems(partnerdashboarddata.workmenuItems);
        await partnerDashboardPage.clickJudgesLink();
        const judgeManagementPage = new JudgeManagementPage(page);
        await judgeManagementPage.verifyJudgeManagementPage();
        await judgeManagementPage.clickJudgeImpersonateButton();
        await partnerAdminPage.clickImpersonateDialogButton();
        const judgePanelManagementPage = new JudgePanelManagementPage(page);
        await judgePanelManagementPage.verifyJudgePanelManagementPage();
        await judgePanelManagementPage.clickJudgePanelManagementContinueButton();
        const panelsStartJudgingPage = new PanelsStartJudgingPage(page);
        //await panelsStartJudgingPage.clickStartJudgingContinueButton();
        //await panelsStartJudgingPage.clickContinueDialogButton();
        const judgeWorkPanelPage = new JudgeWorkPanelPage(page);
        await judgeWorkPanelPage.verifyJudgeWorkPanelPage();
        let workCount = await judgeWorkPanelPage.getJudgeWorkCount();
        if(workCount==0){
        const panelsWorkJudgePage = new PanelsWorkJudgePage(page);
        await panelsWorkJudgePage.verifyWorkJudgePage();
        const finishWorkPage = new FinishWorkPage(page);
        await finishWorkPage.clickFinishPanelButton();
        await panelsWorkJudgePage.clickSaveCloseButton();
        await judgePanelManagementPage.verifyJudgePanelManagementPage();
        } else{
            console.log('click judge Work');
            await judgeWorkPanelPage.clickContinueJudgingButton();
            const rateWorkPage = new RateWorkPage(page);
            await rateWorkPage.verifyRateWorkPage();
            while (workCount > 0) {
                console.log('before click while loop ' + workCount)
                await rateWorkPage.verifyRateWorkPage();
                await rateWorkPage.clickRateWorkRating(workrating.workRating);
                await rateWorkPage.clickNextWorkButton();
                workCount = workCount-1;
                //if(workCount==0)break;
                console.log('while loop ' + workCount)
            }
            const panelsWorkJudgePage = new PanelsWorkJudgePage(page);
            await panelsWorkJudgePage.verifyWorkJudgePage();
            const finishWorkPage = new FinishWorkPage(page);
            await finishWorkPage.clickFinishPanelButton();
            await panelsWorkJudgePage.clickSaveCloseButton();
            await judgePanelManagementPage.verifyJudgePanelManagementPage();

        }
        
        //await rateWorkPage.clickRateWorkRating(workrating.workRating);
        

        
        


        
        await page.screenshot({ path: './screenshots/FinishWorkPanelPage.png', fullPage: true });

    })


})