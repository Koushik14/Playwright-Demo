const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import {SignInPage} from '../pages/signin.page';
import{MyAccountPage} from '../pages/myaccount.page';
import{ManageWorkPage} from '../pages/managework.page';
import{UploadWorkPage} from '../pages/manageworkuploadwork.page';
import{CashAwards} from '../pages/manageworkcashawards.page';
import{WorkReviewPage} from '../pages/manageworkreview.page';
import{PayNowDialog} from '../pages/manageworkpaynow.dialog';
import{PaymentPage} from '../pages/manageworkpayment.page';
import{CheckoutStripe} from '../pages/checkoutstripe.page';
import{UploadArtWorkPage} from '../pages/artworkupload.page';
import{ArtWorkReviewPage} from '../pages/artworkreview.page';

const logindata =JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata =JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));
const artworkdata =JSON.parse(JSON.stringify(require('../testdata/artworkuploadworkdata.json')));


test.describe("Art & Writing Site", ()=>{

  test.beforeEach(async({page})=>{
    const loginPage = new SignInPage(page);
    await loginPage.signPage();
    await page.screenshot({ path: './screenshots/SignInPage.png', fullPage: true });
    await loginPage.login(logindata.userName,logindata.Password);
    
  })

  test("Verify user able to login properly in art & write site",async({page})=>{ 
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.verifyMyAccountDashboard();
    await page.screenshot({ path: './screenshots/MyAccountDashboardPage.png', fullPage: true });
        
  })

  test("Verify In My Account Dashboard Page Work Tab Is Visible", async({page})=> {
    const myaccountPage = new MyAccountPage(page);
     await myaccountPage.verifyWorkTab();

  })

  test("Verify My Account Dashboard Click on the Add Work Button", async({page})=> {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    await page.screenshot({ path: './screenshots/AddWorkPage.png', fullPage: true });

  })
  
  test("Verify Art Work Manage Work Page", async({page})=> {
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.verifyManageWorkPage();

  })

  test("Verify Art Work Page Basic Info Data", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    await page.screenshot({ path: './screenshots/ArtWorkWithDataPage.png', fullPage: true });

  })

  test("Verify Art Work Upload Page Display Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await page.screenshot({ path: './screenshots/ArtWorkUploadPage.png', fullPage: true });

  })

  test("Verify Art Work Data Entered Properly on the Upload Work Page", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await page.screenshot({ path: './screenshots/ArtWorkUploadWithDataPage.png', fullPage: true });  

  })

  test("Verify Art Work Cash Awards Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
    await uploadWorkPage.clickQWNoRadioButton();
    await uploadWorkPage.clickParaNoRadioButton();
    await uploadWorkPage.clickIWNoRadioButton();
    await manageWorkPage.clickSaveAndContinueButton();
    
    
    const cashAwardsPage = new CashAwards(page);
    await cashAwardsPage.waitForCashAwardsPageLoad();
    await cashAwardsPage.verifyCashAwardPage();
    await page.screenshot({ path: './screenshots/ArtWorkCashAwardsPage.png', fullPage: true });

  })

  test("Verify Art Work Review Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
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

    const artWorkReviewPage = new ArtWorkReviewPage(page);
    await artWorkReviewPage.verifyArtWorkReviewPage();
    await page.screenshot({ path: './screenshots/ArtWorkReviewPage.png', fullPage: true });

  })

  test("Verify Art Work Submit Review Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
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
    const artWorkReviewPage = new ArtWorkReviewPage(page);
    await artWorkReviewPage.verifyArtWorkReviewPage();
    await reviewWorkPage.clickReviewCopyrightButton();
    await reviewWorkPage.clickReviewTermsAndConditionsButton();
    await reviewWorkPage.clickReviewEnterForJudgingButton();

    

    const paynowDialog = new PayNowDialog(page);
    await paynowDialog.waitForPayNowModalLoad();
    await paynowDialog.verifyPayNowDialog();
    await page.screenshot({ path: './screenshots/ArtWorkPayNowModalPage.png', fullPage: true });
    
  })

  test("Verify Art Work Payment Page Displayed Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
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
    const artWorkReviewPage = new ArtWorkReviewPage(page);
    await artWorkReviewPage.verifyArtWorkReviewPage();
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
    await page.screenshot({ path: './screenshots/ArtWorkPaymentPage.png', fullPage: true });

    
  })

  test("Verify Art Work Checkout Payment Done Properly", async({page})=> {
    test.slow();
    const myaccountPage = new MyAccountPage(page);
    await myaccountPage.clickAddWorkButton();
    const manageWorkPage = new ManageWorkPage(page);
    await manageWorkPage.enterWorkTitle(artworkdata.artWorkTitle);
    await manageWorkPage.enterCatType(artworkdata.artworkcategorytypedropdownvalue);
    await manageWorkPage.enterCatCode(artworkdata.artworkcategorycodedropdownvalue);
    await manageWorkPage.enterBriefSummary(artworkdata.artWorkBriefSummary);
    await manageWorkPage.enterEducatorValue(artworkdata.selecteducatorid);
    await manageWorkPage.clickSaveAndContinueButton();
    
    const uploadWorkPage = new UploadWorkPage(page);
    await uploadWorkPage.waitForUploadWorkPageLoad();
    const artWorkUploadPage = new UploadArtWorkPage(page);
    await artWorkUploadPage.verifyArtWorkUploadPage();
    await artWorkUploadPage.enterArtWorkAddHeight(artworkdata.artWorkHeight);
    await artWorkUploadPage.enterArtWorkAddWidth(artworkdata.artWorkWidth);
    await artWorkUploadPage.enterArtWorkAddDepth(artworkdata.artWorkDepth);
    await artWorkUploadPage.enterArtWorkToolsAndMaterials(artworkdata.artWorkToolsAndMaterial);
    await artWorkUploadPage.uploadArtWorkImage();
 
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
    const artWorkReviewPage = new ArtWorkReviewPage(page);
    await artWorkReviewPage.verifyArtWorkReviewPage();
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
    await checkoutPayment.clickCheckoutPayButton();
    await checkoutPayment.verifyPaymentProcess();
    //await myaccountPage.clickWritingWorkButton();

    await page.screenshot({ path: './screenshots/ArtWork.png', fullPage: true });

    
  })

  

})

