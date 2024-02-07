import test, { expect } from 'playwright/test';
const artWorkReviewObjLocator =JSON.parse(JSON.stringify(require('../objectelementrepository/artworkreviewobjectelement.json')));

exports.ArtWorkReviewPage = class ArtWorkReviewPage {
    constructor(page){
        this.page = page;
        this.artWorkReviewPageHeaderText=page.locator(artWorkReviewObjLocator.artWorkReviewPageHeaderText);
        this.artWorkReviewTab=page.locator(artWorkReviewObjLocator.artWorkReviewTab);
        this.artWorkReviewUploadedArt=page.locator(artWorkReviewObjLocator.artWorkReviewUploadedArt);
    }

    async verifyArtWorkReviewPage(){
        await expect(this.artWorkReviewPageHeaderText).toBeVisible();
        await expect(this.artWorkReviewTab).toBeVisible();
        await expect(this.artWorkReviewUploadedArt).toBeVisible();
    }
}