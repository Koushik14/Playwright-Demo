//const {test, expect}= require ('@playwright/test');
//const ordata = require('./objectrepository.json');
import test from 'playwright/test';
const objLocator =JSON.parse(JSON.stringify(require('./objectrepository.json')));

exports.LoginPage = class LoginPage {
    constructor(page) {

      this.page = page;
      //reading locator value from objectrepository.json file
      this.signInButton = page.getByLabel(objLocator.Signinlink);
      this.usernameTextbox = page.getByRole('textbox', { name: objLocator.usernameTextbox });
      this.passwordTextbox = page.getByRole('textbox', { name: objLocator.usernamePassword });
      //this.loginButton = page.getByRole('button', { name: objLocator.signinbuttonname, exact: true });
      //this.login_button = page.getByRole('button', { name: 'Login' });
      this.loginButton = page.locator('[type="hidden"] + button[type="submit"]');
      this.acceptCookies = page.getByRole('button', { name: 'Accept Cookies' });
    
    }

    async login(username, password) {
      await this.acceptCookies.click();
      await this.signInButton.click();
      await this.usernameTextbox.fill(username);
      await this.passwordTextbox.fill(password);
      await this.loginButton.click();
      await this.page.waitForNavigation();
      await this.page.waitForURL('**/s/hpb/account?registration=false');
                
    }
    
  }