import test, { expect } from 'playwright/test';
const uploadArtWorkObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/artworkuploadobjectelement.json')));

exports.UploadArtWorkPage = class UploadArtWorkPage {
    constructor(page){
        this.page=page;
        this.artWorkPageHeaderText=page.locator(uploadArtWorkObjLocator.artWorkPageHeaderText);
        this.artWorkUploadWorkText=page.locator(uploadArtWorkObjLocator.artWorkUploadWorkText);
        this.artWorkDescribeMyWorkText=page.locator(uploadArtWorkObjLocator.artWorkDescribeMyWorkText);
        this.artWorkAddHeightTextbox=page.getByPlaceholder(uploadArtWorkObjLocator.artWorkAddHeightTextbox);
        this.artWorkAddWidthTextbox=page.getByPlaceholder(uploadArtWorkObjLocator.artWorkAddWidthTextbox);
        this.artWorkAddDepthTextbox=page.getByPlaceholder(uploadArtWorkObjLocator.artWorkAddDepthTextbox);
        this.artWorkToolsAndMaterialsTextbox=page.getByPlaceholder(uploadArtWorkObjLocator.artWorkToolsAndMaterialsTextbox);
        this.artWorkBrowseFileLink=page.getByText(uploadArtWorkObjLocator.artWorkBrowseFileLink);
        //this.artWorkUploadFile=page.locator('div').filter({ hasText: /^Drag and drop or browse files$/ });
        this.artWorkUploadFile=page.locator("input[type='file']");
    }

    async verifyArtWorkUploadPage(){
        await expect(this.artWorkPageHeaderText,'Art Work Page Displayed').toBeVisible();
        await expect(this.artWorkUploadWorkText,'Art Work Upload Page Displayed').toBeVisible();
        await expect(this.artWorkUploadWorkText).toBeVisible();
    }

    async enterArtWorkAddHeight(enterHeight){
        await this.artWorkAddHeightTextbox.fill(enterHeight);

    }

    async enterArtWorkAddWidth(enterWidth){
        await this.artWorkAddWidthTextbox.fill(enterWidth);

    }

    async enterArtWorkAddDepth(enterDepth){
        await this.artWorkAddDepthTextbox.fill(enterDepth);

    }

    async enterArtWorkToolsAndMaterials(enterToolsAndMaterials){
        await this.artWorkToolsAndMaterialsTextbox.fill(enterToolsAndMaterials);
        await this.artWorkToolsAndMaterialsTextbox.press('Enter');

    }

    async uploadArtWorkImage(){
        await this.artWorkBrowseFileLink.click();
        await this.artWorkUploadFile.setInputFiles('./artworkimages/JewelryDesign.png');
        await expect(this.page.getByText('JewelryDesign.png')).toBeVisible();

    }
}