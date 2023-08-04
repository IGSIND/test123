import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
const devTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/dev/testData.json')));
const p7TestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/p7/testData.json')));
const productionTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/production/testData.json')));
const qaTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/qa/testData.json')));
const sandboxTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/sandbox/testData.json')));
const stagingTestData = JSON.parse(JSON.stringify(require('../../enviroment-variables/staging/testData.json')));

let webActions: WebActions;
let testData = qaTestData;
if (process.env.ENV == 'dev') {
    testData = devTestData;
}
else if(process.env.ENV == 'p7'){
    testData = p7TestData;
} 
else if(process.env.ENV == 'production'){
    testData = productionTestData;
} 
else if(process.env.ENV == 'qa'){
    testData = qaTestData;
} 
else if(process.env.ENV == 'sandbox'){
    testData = sandboxTestData;
} 
else if(process.env.ENV == 'staging'){
    testData = stagingTestData;
} 

export class EluminaLoginPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly HOMEPAGE: Locator;
    readonly AUTHOR: Locator;
    readonly EXAMSMENU: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.USERNAME_EDITBOX = page.locator('(//input)[1]');
        this.PASSWORD_EDITBOX = page.locator('(//input)[2]');
        this.LOGIN_BUTTON = page.locator('//*[@class="submit-butn"]');
        this.HOMEPAGE = page.locator('//*[@title="Question Management System"]');
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')

    }

    /**Navigate to login URL */
    async navigateToURL(): Promise<void> {
        await this.page.goto("/");
    }

    /**Navigate to Login Application */
    async loginToApplication(): Promise<void> {
        //const decipherPassword = await webActions.decipherPassword();
        await this.USERNAME_EDITBOX.fill(testData.UserEmail);
        await this.PASSWORD_EDITBOX.fill(testData.UserPassword);
        await this.LOGIN_BUTTON.click();
    }

    /**Method to Verify Profile page */
    async verifyProfilePage(): Promise<void> {
        await expect(this.HOMEPAGE).toBeVisible();
    }

}