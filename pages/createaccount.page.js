import test, { expect } from 'playwright/test';
const createAccountObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/createaccountobjectelement.json')));

exports.CreateAccountPage = class CreateAccountPage {
    constructor(page){
        this.page=page;
        this.createAccountTeenButton=page.getByRole('button', { name: createAccountObjLocator.createAccountTeenButton });
        this.createAccountEducatorButton=page.getByRole('button', { name: createAccountObjLocator.createAccountEducatorButton });
        this.createAccountSignUpPageHeaderText=page.locator(createAccountObjLocator.createAccountSignUpPageHeaderText);
        this.creatAccountSignUpDOBDropdown=page.locator(createAccountObjLocator.creatAccountSignUpDOBCalForm).getByRole(createAccountObjLocator.creatAccountSignUpDOBCalImg);
        this.creatAccountSignUpDOBCalCombo=page.getByRole(createAccountObjLocator.creatAccountSignUpDOBCalCombo).nth(1);
        this.creatAccountSignUpGradeDropdown=page.locator(createAccountObjLocator.creatAccountSignUpGradeDropdown);
        this.creatAccountSignUpCreateAccountButton=page.getByRole('button', { name: createAccountObjLocator.creatAccountSignUpCreateAccountButton });
        this.creatAccountSignUpFirstNameTextBox=page.locator(createAccountObjLocator.creatAccountSignUpFirstNameTextBox);
        this.creatAccountSignUpLastNameTextBox=page.locator(createAccountObjLocator.creatAccountSignUpLastNameTextBox);
        this.creatAccountSignUpPronounDropDown=page.locator(createAccountObjLocator.creatAccountSignUpPronounDropDown);
        this.creatAccountSignUpPronounDropDownValue=page.locator(createAccountObjLocator.creatAccountSignUpPronounDropDownValue);
        this.creatAccountSignUpEthnicityDropDown=page.locator(createAccountObjLocator.creatAccountSignUpEthnicityDropDown);
        this.creatAccountSignUpEthnicityDropDownValue=page.locator(createAccountObjLocator.creatAccountSignUpEthnicityDropDownValue);
        this.creatAccountSignUpEmailTextBox=page.locator(createAccountObjLocator.creatAccountSignUpEmailTextBox);
        this.creatAccountSignUpEmailConfTextBox=page.getByLabel(createAccountObjLocator.creatAccountSignUpEmailConfTextBox);
        this.creatAccountSignUpPhoneNumberTextBox=page.getByPlaceholder(createAccountObjLocator.creatAccountSignUpPhoneNumberTextBox);
        this.creatAccountSignUpCreatePassTextBox=page.getByLabel(createAccountObjLocator.creatAccountSignUpCreatePassTextBox);
        this.creatAccountSignUpVerifyPassTextBox=page.getByLabel(createAccountObjLocator.creatAccountSignUpVerifyPassTextBox);
        this.creatAccountSignUpParentGaurdianTextHeader=page.getByRole('heading', { name: createAccountObjLocator.creatAccountSignUpParentGaurdianTextHeader });
        this.creatAccountSignUpParentFirstNameTextBox=page.locator(createAccountObjLocator.creatAccountSignUpParentFirstNameTextBox);
        this.creatAccountSignUpParentLastNameTextBox=page.locator(createAccountObjLocator.creatAccountSignUpParentLastNameTextBox);
        this.creatAccountSignUpParentEmailTextBox=page.getByPlaceholder(createAccountObjLocator.creatAccountSignUpParentEmailTextBox, { exact: true });
        this.creatAccountSignUpFindRegionTextHeader=page.getByRole('heading', { name: createAccountObjLocator.creatAccountSignUpFindRegionTextHeader });
        this.creatAccountSignUpCountryDropdown=page.locator(createAccountObjLocator.creatAccountSignUpCountryDropdown);
        this.creatAccountSignUpStateDropdown=page.locator(createAccountObjLocator.creatAccountSignUpStateDropdown);
        this.creatAccountSignUpZipcodeTextBox=page.locator(createAccountObjLocator.creatAccountSignUpZipcodeTextBox);
        this.createAccountMyInfoPageHeadertext=page.getByRole('heading', { name: createAccountObjLocator.createAccountMyInfoPageHeadertext });

    }

    async verifyMyInfoPage(){
        await expect(this.createAccountMyInfoPageHeadertext,'Create Account My Information Displayed').toBeVisible();
    }

    async clickTeenButton(){
        await this.createAccountTeenButton.click();
    }

    async clickEducatorButton(){
        await this.createAccountEducatorButton.click();
    }

    async verifySignUpPage(){
        await expect(this.createAccountSignUpPageHeaderText).toBeVisible();
    }

    async waitForSignUpPageLoad(){
        await this.page.waitForURL('**/sign-up');
    }

    async clickDOBDropdown(){
        await this.creatAccountSignUpDOBDropdown.click();
    }

    async selectDOBYear(enterYear){
        await this.creatAccountSignUpDOBCalCombo.selectOption(enterYear);
    }

    async selectDate(enterDate){
        await this.page.getByRole('button', { name: enterDate, exact: true }).first().click();
    }

    async selectGrade(enterGrade){
        await this.creatAccountSignUpGradeDropdown.selectOption(enterGrade);
    }

    async clickCreateMyAccountButton(){
        await this.creatAccountSignUpCreateAccountButton.click();
    }

    async enterFirstName(enterFName){
        await this.creatAccountSignUpFirstNameTextBox.fill(enterFName);
    }

    async enterLastName(enterLName){
        await this.creatAccountSignUpLastNameTextBox.fill(enterLName);
    }

    async clickOnPronounDropdown(){
        await this.creatAccountSignUpPronounDropDown.click();
    }

    async selectPronounValue(enterPronounValue){
        await this.page.locator(enterPronounValue).click();
    }

    async clickOnEthnicityDropdown(){
        await this.creatAccountSignUpEthnicityDropDown.click();
    }

    async selectEthnicityValue(enterEthnicityValue){
        await this.page.locator(enterEthnicityValue).click();
    }

    async enterEmail(enterUserEmail){
        await this.creatAccountSignUpEmailTextBox.fill(enterUserEmail);

    }

    async enterConfEmail(enterUserConfEmail){
        await this.creatAccountSignUpEmailConfTextBox.fill(enterUserConfEmail);

    }

    async enterPhoneNumber(enterPhoneNumbers){
        await this.creatAccountSignUpPhoneNumberTextBox.fill(enterPhoneNumbers);

    }

    async enterCreatePassword(enterPassword){
        await this.creatAccountSignUpCreatePassTextBox.fill(enterPassword);

    }

    async enterVerifyPassword(enterVerfyPassword){
        await this.creatAccountSignUpVerifyPassTextBox.fill(enterVerfyPassword);

    }

    async verifyParentGaurdianHeader(){
        await expect(this.creatAccountSignUpParentGaurdianTextHeader).toBeVisible();
    }

    async enterParentFName(enterPFName){
        await this.creatAccountSignUpParentFirstNameTextBox.fill(enterPFName);

    }

    async enterParentLName(enterPLName){
        await this.creatAccountSignUpParentLastNameTextBox.fill(enterPLName);

    }

    async enterParentEmail(enterPEmail){
        await this.creatAccountSignUpParentEmailTextBox.fill(enterPEmail);

    }

    async verifyRegionHeader(){
        await expect(this.creatAccountSignUpFindRegionTextHeader,'Create Account Sign up Find Region Displayed').toBeVisible();
    }

    async selectCountry(enterCountry){
        await this.creatAccountSignUpCountryDropdown.selectOption(enterCountry);
    }

    async selectState(enterState){
        await this.creatAccountSignUpStateDropdown.selectOption(enterState);
    }

    async enterZipCode(enterZCode){
        await this.creatAccountSignUpZipcodeTextBox.fill(enterZCode);

    }

    async selectSchool(enterSchoolName){
        await this.page.locator('label').filter({ hasText: enterSchoolName }).locator('span').click();

    }

    async waitForCreateAccountDashboardPageLoad(){
        await this.page.waitForURL('**/work?type=A');
    }



    
    

}