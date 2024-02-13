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
import {SearchPage} from '../pages/search.page';

const logindata =JSON.parse(JSON.stringify(require('../testdata/logindata.json')));
const manageworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkbasicinfodata.json')));
const uploadworkdata =JSON.parse(JSON.stringify(require('../testdata/manageworkuploadworkdata.json')));
const checkoutdata =JSON.parse(JSON.stringify(require('../testdata/checkoutdata.json')));
const searchdata =JSON.parse(JSON.stringify(require('../testdata/searchdata.json')));

const records = parse(csv.readFileSync('./testdata/logindata.csv','utf-8'), {
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
      for(const record of records){
        if(isMobile==false){
          await loginPage.adminUserlogin(record.userNameAdmin,record.PasswordAdmin);  
        }
        else{
          await loginPage.adminUserlogin(record.userNameAdmin,record.PasswordAdmin);
        }
        
      }
      
    })
  
    test("Verify user able to search any work properly",async({page})=>{ 
      test.slow();
      const session = await page.context().newCDPSession(page);
      await session.send("Performance.enable");
      await allure.parentSuite("Search Work");
      const searchPage = new SearchPage(page);
      await searchPage.verifySearchPageDisplay();
      await searchPage.searchComboSelect(searchdata.searchValue);
      await searchPage.searchButtonClick(searchdata.searchTabName, searchdata.SearchButtonText);
      await searchPage.searchResultFirstCellDisplay();
      var seachText=await searchPage.getSearchResultCountText();
      console.log(seachText);
      await searchPage.clickSearchPageNavIcon();
      var searchIconDisplay= await searchPage.searchLoadingDisplay();
      console.log("Initial Search value :", searchIconDisplay);
      while(searchIconDisplay){
        await searchPage.clickSearchPageNavIcon();
        var seachText2=await searchPage.getSearchResultCountText();
        searchIconDisplay= await searchPage.searchLoadingDisplay();
        console.log("From While Loop Search value :", searchIconDisplay);
        console.log(seachText2);
        //await page.screenshot({ path: './screenshots/SearchResultPage.png', fullPage: true });
      }
 
    //   console.log("=============CDP Performance Metrics===============")
    //   let performanceMetrics = await session.send("Performance.getMetrics")
    //   console.log(performanceMetrics.metrics)
      //await page.screenshot({ path: './screenshots/SearchResultPage.png', fullPage: true });
          
    })
})