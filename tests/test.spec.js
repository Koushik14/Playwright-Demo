const { chromium } = require('playwright');
import {test,expect } from '@playwright/test';
import {SignInPage} from '../pages/signin.page';
import{MyAccountPage} from '../pages/myaccount.page';
import{ManageWorkPage} from '../pages/managework.page';
import{UploadWorkPage} from '../pages/manageworkuploadwork.page';
import{CashAwards} from '../pages/manageworkcashawards.page';
import{WorkReviewPage} from '../pages/manageworkreview.page';
import{PayNowDialog} from '../pages/manageworkpaynow.dialog';
import{PaymentPage} from '../pages/manageworkpayment.page';
import{CheckoutStripe} from '../pages/checkoutstripe.page';
import { allure } from "allure-playwright";
import * as csv from 'fs'
import{path} from 'path';
import { parse } from 'csv-parse/sync';

const logindata =JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata =JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));

const loginCSV = parse(csv.readFileSync('./testdata/logindata.csv','utf-8'), {
  columns: true,
  skip_empty_lines: true
});

test.describe("Art & Writing Site", ()=>{

   test.beforeEach(async({page,isMobile})=>{
      
    const loginPage = new SignInPage(page);
    await loginPage.signPage();
    await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
    //Login using JSON file data
    //await loginPage.login(logindata.userName,logindata.Password);
    //Login using CSV Data File
    //console.log(isMobile)
    for(const csvLoginData of loginCSV){
      if(isMobile==false){
        await loginPage.login(csvLoginData.userName,csvLoginData.Password);  
      }
      else{
        await loginPage.login(csvLoginData.userNameMobile,csvLoginData.PasswordMobile);
      }
      
    }
    
  })

  test("Verify user able to login properly in art & write site",async({page},testInfo)=>{ 
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.verifyMyAccountDashboard();
    await page.screenshot({ path: './screenshots/MyAccountDashboardPage.png', fullPage: true });
        
  })

  test("Verify In My Account Dashboard Page Work Tab Is Visible", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
     await myaccountPage.verifyWorkTab();

  })

  test("Verify My Account Dashboard Click on the Add Work Button", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    await page.screenshot({ path: './screenshots/AddWorkPage.png', fullPage: true });

  })

  test("Verify In My Account Dashboard Page Portfolio Tab Is Visible", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.verifyPortfolioTab();
    

  })

  test("Verify My Account Dashboard Click on the Add Portfolio Button", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickPortfolioTab();
    await page.screenshot({ path: './screenshots/MyAccountDashboardPortfolioPage.png', fullPage: true });

  })

  test("Verify Manage Work Page", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.verifyManageWorkPage();

  })

  test("Verify Manage Work Page Data", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    await page.screenshot({ path: './screenshots/ManageWorkWithDataPage.png', fullPage: true });

  })

  test("Verify Work Upload Page Display Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.verifyMinWritingContentMessage();
    await page.screenshot({ path: './screenshots/UploadWorkPage.png', fullPage: true });

  })

  test("Verify Writing Data Entered Properly on the Upload Work Page", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await page.screenshot({ path: './screenshots/UploadWorkWithDataPage.png', fullPage: true });

  })

  test("Verify Cash Awards Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await page.screenshot({ path: './screenshots/CashAwardsPage.png', fullPage: true });

  })

  test("Verify Review Work Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await manageWorkPage.clickSaveAndContinueButton();
        
    const reviewWorkPage = new WorkReviewPage(page);
    await reviewWorkPage.waitForReviewWorkPageLoad();
    await reviewWorkPage.verifyReviewWorkPage();
    await page.screenshot({ path: './screenshots/ReviewWorkPage.png', fullPage: true });

  })

  test("Verify Submit Review Work Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await manageWorkPage.clickSaveAndContinueButton();
        
    const reviewWorkPage = new WorkReviewPage(page);
    await reviewWorkPage.waitForReviewWorkPageLoad();
    await reviewWorkPage.verifyReviewWorkPage();
    await reviewWorkPage.clickReviewCopyrightButton();
    await reviewWorkPage.clickReviewTermsAndConditionsButton();
    await reviewWorkPage.clickReviewEnterForJudgingButton();

    

    const paynowDialog = new PayNowDialog(page);
    await paynowDialog.waitForPayNowModalLoad();
    await paynowDialog.verifyPayNowDialog();
    await page.screenshot({ path: './screenshots/PayNowModalPage.png', fullPage: true });
    
  })

  test("Verify Payment Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await manageWorkPage.clickSaveAndContinueButton();
        
    const reviewWorkPage = new WorkReviewPage(page);
    await reviewWorkPage.waitForReviewWorkPageLoad();
    await reviewWorkPage.verifyReviewWorkPage();
    await reviewWorkPage.clickReviewCopyrightButton();
    await reviewWorkPage.clickReviewTermsAndConditionsButton();
    await reviewWorkPage.clickReviewEnterForJudgingButton();

    

    const paynowDialog = new PayNowDialog(page);
    await paynowDialog.waitForPayNowModalLoad();
    await paynowDialog.verifyPayNowDialog();
    await paynowDialog.clickPayNowButton();
    const paymentPage= new PaymentPage(page);
    await paymentPage.waitForPaymentPageLoad();
    await paymentPage.verifyPaymentPage();
    await paymentPage.selectPayWithCCDC();
    await page.screenshot({ path: './screenshots/PaymentPage.png', fullPage: true });

    
  })

  test("Verify Writing Work Checkout Payment Done Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(manageworkdata.title);
    await manageWorkPage.enterCatType(manageworkdata.categorytypedropdownvalue);
    await manageWorkPage.enterCatCode(manageworkdata.categorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(manageworkdata.briefsummary);
    await manageWorkPage.enterEducatorValue(manageworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    await uploadWorkPage.verifyUploadWorkPage();
    await uploadWorkPage.waitForContentTextboxVisible();
    await uploadWorkPage.verifyBlankWritingContent();
    await uploadWorkPage.enterUploadWorkWriting(uploadworkdata.uploadWorkWriting);
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await manageWorkPage.clickSaveAndContinueButton();
        
    const reviewWorkPage = new WorkReviewPage(page);
    await reviewWorkPage.waitForReviewWorkPageLoad();
    await reviewWorkPage.verifyReviewWorkPage();
    await reviewWorkPage.clickReviewCopyrightButton();
    await reviewWorkPage.clickReviewTermsAndConditionsButton();
    await reviewWorkPage.clickReviewEnterForJudgingButton();

    

    const paynowDialog = new PayNowDialog(page);
    await paynowDialog.waitForPayNowModalLoad();
    await paynowDialog.verifyPayNowDialog();
    await paynowDialog.clickPayNowButton();
    const paymentPage= new PaymentPage(page);
    await paymentPage.waitForPaymentPageLoad();
    await paymentPage.verifyPaymentPage();
    await paymentPage.selectPayWithCCDC();
    await paymentPage.clickPayButton();

    const checkoutPayment = new CheckoutStripe(page);
    await checkoutPayment.verifyCheckoutStripe();
    await checkoutPayment.checkoutPageEnterEmail(checkoutdata.checkoutEmail);
    await checkoutPayment.checkoutPageEnterCardNumber(checkoutdata.checkoutCardNumber);
    await checkoutPayment.checkoutPageEnterExpDate(checkoutdata.checkoutCardExpDate);
    await checkoutPayment.checkoutPageEnterCVV(checkoutdata.checkoutCardCVV);
    await checkoutPayment.checkoutPageEnterCardHolderName(checkoutdata.checkoutCardHolderName);
    await checkoutPayment.checkoutPageSelectCountry(checkoutdata.checkoutCountryName);
    await checkoutPayment.clickCheckoutPayButton();
    await checkoutPayment.verifyPaymentProcess();
    await myaccountPage.verifyWritingWork();
    

    await page.screenshot({ path: './screenshots/WitingMyWorkPage.png', fullPage: true });

    
  })

  

   

})

