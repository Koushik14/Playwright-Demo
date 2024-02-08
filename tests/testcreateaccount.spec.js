const { chromium } = require('playwright');
import { test, expect } from '@playwright/test';
import {SignInPage} from '../pages/signin.page';
import{CreateAccountPage} from '../pages/createaccount.page';
import{MyAccountPage} from '../pages/myaccount.page';


const logindata =JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata =JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));
const createaccountdata =JSON.parse(JSON.stringify(require('../testdata/createaccountdata.json')));

test.describe("Art & Writing Site", ()=>{
      
    test("Verify Create Account Sign Up Page Display Properly",async({page})=>{
      test.slow();  
      const loginPage = new SignInPage(page);
      await loginPage.signPage();
      await loginPage.waitForSignInPageLoad();
      await loginPage.clickCreateAccountLink();

      const createAccount = new CreateAccountPage(page);
      await createAccount.clickTeenButton();
      await createAccount.waitForSignUpPageLoad();
      await createAccount.verifySignUpPage();      
      await page.screenshot({ path: './screenshots/CreateAccountSignUpPage.png', fullPage: true });
          
    })

    test("Verify Create Account Sign Up Page with data Display Properly",async({page})=>{
        test.slow();  
        const loginPage = new SignInPage(page);
        await loginPage.signPage();
        await loginPage.waitForSignInPageLoad();
        await loginPage.clickCreateAccountLink();
  
        const createAccount = new CreateAccountPage(page);
        await createAccount.clickTeenButton();
        await createAccount.waitForSignUpPageLoad();
        await createAccount.verifySignUpPage(); 
        await createAccount.clickDOBDropdown();
        await createAccount.selectDOBYear(createaccountdata.createAccountDOBSelectYear);  
        await createAccount.selectDate(createaccountdata.createAccountDOBSelectDate);
        await createAccount.selectGrade(createaccountdata.createAccountDOBSelectGrade);   
        await page.screenshot({ path: './screenshots/CreateAccountSignUpPageWithData.png', fullPage: true });
            
      })

      test("Verify Create Account Sign Up Page with My Info Page Display Properly",async({page})=>{
        test.slow();  
        const loginPage = new SignInPage(page);
        await loginPage.signPage();
        await loginPage.waitForSignInPageLoad();
        await loginPage.clickCreateAccountLink();
  
        const createAccount = new CreateAccountPage(page);
        await createAccount.clickTeenButton();
        await createAccount.waitForSignUpPageLoad();
        await createAccount.verifySignUpPage(); 
        await createAccount.clickDOBDropdown();
        await createAccount.selectDOBYear(createaccountdata.createAccountDOBSelectYear);  
        await createAccount.selectDate(createaccountdata.createAccountDOBSelectDate);
        await createAccount.selectGrade(createaccountdata.createAccountDOBSelectGrade);
        await createAccount.clickCreateMyAccountButton();
        await createAccount.verifyMyInfoPage();

        await page.screenshot({ path: './screenshots/CreateAccountSignUpPageMyInfo.png', fullPage: true });
            
      })

      test("Verify User Create Account Successfully",async({page, isMobile})=>{
        test.slow();  
        
        const loginPage = new SignInPage(page);
        await loginPage.signPage();
        await loginPage.waitForSignInPageLoad();
        await loginPage.clickCreateAccountLink();
  
        const createAccount = new CreateAccountPage(page);
        await createAccount.clickTeenButton();
        await createAccount.waitForSignUpPageLoad();
        await createAccount.verifySignUpPage(); 
        await createAccount.clickDOBDropdown();
        await createAccount.selectDOBYear(createaccountdata.createAccountDOBSelectYear);  
        await createAccount.selectDate(createaccountdata.createAccountDOBSelectDate);
        await createAccount.selectGrade(createaccountdata.createAccountDOBSelectGrade);
        await createAccount.clickCreateMyAccountButton();
        await createAccount.verifyMyInfoPage();
        await createAccount.enterFirstName(createaccountdata.createAccountFirstName);
        await createAccount.enterLastName(createaccountdata.createAccountLastName);
        await createAccount.clickOnPronounDropdown();
        await createAccount.selectPronounValue(createaccountdata.createAccountPronoun);
        await createAccount.clickOnEthnicityDropdown();
        await createAccount.selectEthnicityValue(createaccountdata.createAccountEthnicity);
        
        if(isMobile==false){
          console.log(isMobile);
          await createAccount.enterEmail(createaccountdata.createAccountEmail);
          await createAccount.enterConfEmail(createaccountdata.createAccountEmail);
        }else{
          console.log('mobile device: ' + isMobile);
          await createAccount.enterEmail(createaccountdata.createAccountEmailMobile);
          await createAccount.enterConfEmail(createaccountdata.createAccountEmailMobile);
        }
        
        await createAccount.enterPhoneNumber(createaccountdata.createAccountPhoneNumber);
        await createAccount.enterCreatePassword(createaccountdata.createAccountPassword);
        await createAccount.enterVerifyPassword(createaccountdata.createAccountPassword);

        await createAccount.enterParentFName(createaccountdata.createAccountParentFirstName);
        await createAccount.enterParentLName(createaccountdata.createAccountParentLastName);
        await createAccount.enterParentEmail(createaccountdata.createAccountParentEmail);

        await createAccount.selectCountry(createaccountdata.createAccountCountry);
        await createAccount.selectState(createaccountdata.createAccountState);
        await createAccount.enterZipCode(createaccountdata.createAccountZipcode);
        await createAccount.selectSchool(createaccountdata.createAccountSchoolName);
        await createAccount.clickCreateMyAccountButton();
        await page.screenshot({ path: './screenshots/CreateAccountData.png', fullPage: true });
        await createAccount.waitForCreateAccountDashboardPageLoad();

        await page.screenshot({ path: './screenshots/CreateAccountLoginDashboardPage.png', fullPage: true });
            
      })
})