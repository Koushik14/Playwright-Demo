import test from 'playwright/test';
const signObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/signinobjectelement.json')));

exports.SignInPage = class SignInPage {
    constructor(page) {

      this.page = page;
      //reading locator value from objectrepository.json file
      
      this.usernameTxtbox = page.getByPlaceholder(signObjLocator.usernameTextbox);
      this.passwordTxtbox = page.getByPlaceholder(signObjLocator.passwordTextbox);
      this.loginButton = page.getByRole('button', { name: signObjLocator.signinButton, exact:true });
      //this.creatAccountLink=page.getByLabel(signObjLocator.creatAccountLink);
      this.creatAccountLink=page.getByText(signObjLocator.creatAccountLink);
      
    
    }

    async signPage() {
      
      await this.page.goto('https://dev-portal-stage.artandwriting.org/sign-in');
      //await this.page.screenshot({ path: 'scholSignin.png', fullPage: true });
    }

    async login(username, password) {
      
      await this.usernameTxtbox.fill(username);
      await this.passwordTxtbox.fill(password);
      await this.page.keyboard.press('Tab'); 
      await this.loginButton.click();
      
      await this.page.waitForNavigation();
      await this.page.waitForURL('**/participants/dashboard/work?type=A');
                
    }

    async adminUserlogin(username, password) {
      
      await this.usernameTxtbox.fill(username);
      await this.passwordTxtbox.fill(password);
      await this.loginButton.click();
      
      await this.page.waitForNavigation();
      await this.page.waitForURL('**/allianceAdmin/searchAction/work');
                
    }

    async superAdminUserlogin(username, password) {
      
      await this.usernameTxtbox.fill(username);
      await this.passwordTxtbox.fill(password);
      await this.loginButton.click();
      
      await this.page.waitForNavigation();
      await this.page.waitForURL('**/admin');
                
    }

    async clickCreateAccountLink(){
      await this.creatAccountLink.click();

    }

    async waitForSignInPageLoad(){
      await this.page.waitForURL('**/sign-in');
    }
    
  }