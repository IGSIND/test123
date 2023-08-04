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

export class EluminaInvCandidatePage {
    readonly page: Page;
    readonly page1:Page;
    readonly context: BrowserContext;
    readonly context1: BrowserContext;
    readonly CandidateUsername: Locator;
    readonly CandidatePassword: Locator;
    readonly LOGIN_BUTTON: Locator;
    readonly ClickStartExamLink:Locator;
    readonly EnterExaPassword:Locator;
    readonly ClickOnStartExamBtn:Locator;
    readonly ClickOnNextBtn:Locator;
    readonly ClickOnRevieweBtn:Locator;
    readonly ClickOnSubmitBtn:Locator;
    readonly signOutBtn:Locator;
 

    constructor(page: Page, context: BrowserContext/*page1:Page,context1: BrowserContext*/) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.CandidateUsername = page.locator('//input[@id="username"]');
        this.CandidatePassword = page.locator('//input[@id="password"]');
        this.LOGIN_BUTTON = page.locator('//div[text()=" Login "]');
        this.ClickStartExamLink=page.locator('//table[@class="table-container"]//tr[2]//td[6]');
        this.EnterExaPassword=page.locator('//input[contains(@class,"password")]');
        this.ClickOnStartExamBtn=page.locator('//div[@class="btn parent-body-container btn-primary"]');
        this.ClickOnNextBtn=page.locator('(//div[text()=" Next "])[1]');
        this.ClickOnRevieweBtn=page.locator('(//div[text()=" Review "])[1]');
        this.ClickOnSubmitBtn=page.locator('(//div[text()=" Submit "])[1]');
        this.signOutBtn=page.locator('//div[@class="signout"]');
        
    }

    /**Method to Navigate to Candidate URL */
    async candidateNavigateToURL(): Promise<void> {
        await this.page.goto(testData.cadidateURL);        
    }

    /**Method to navigate to Candidate application */
    async candidateLoginToApplications(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        //const fileName = './User_details (30).xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
          const ws = wb.getWorksheet('Worksheet');
              console.log(ws.actualRowCount)
              console.log(ws.getRow(2).getCell(1).value)
              console.log(ws.getRow(2).getCell(4).value)
              await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
              await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
        await this.page.waitForTimeout(5000);
        await this.LOGIN_BUTTON.click();
    }

    /**Method to candidate Login To Applications By Entering Username*/
    async candidateLoginToApplicationsByEnteringUsername(): Promise<void> {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const fileName = './download/User_details.xlsx';
        wb.xlsx.readFile(fileName).then(async () => {
            let data: any;
          const ws = wb.getWorksheet('Worksheet');
              console.log(ws.actualRowCount)
              console.log(ws.getRow(2).getCell(1).value)
              console.log(ws.getRow(2).getCell(4).value)
              await this.CandidateUsername.fill(ws.getRow(2).getCell(1).value);
              await this.CandidatePassword.fill(ws.getRow(2).getCell(4).value);
        })
    }

    /**Method to Candidate to start exam*/
    async candidateStartExams(): Promise<void>{
        await this.ClickStartExamLink.click();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(5000);
        await this.EnterExaPassword.type('ABC09');
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();

           }
           await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
           await this.ClickOnRevieweBtn.click();
    }

    async  againCandidateLogin():Promise<void>{
            await this.page.bringToFront();
            await this.page.waitForTimeout(10000);
     }

    /**Method to Enter Invaild Exam Password */
    async enterInvalidExamPassword():Promise<void>{
        await this.ClickStartExamLink.click();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(5000);
        await this.EnterExaPassword.type('ABCD09');
        await this.ClickOnStartExamBtn.click();
        await this.page.waitForSelector('//div[@class="question-number-container"]//div//p',{timeout:10000});
        const qutns=await this.page.$$('//div[@class="question-number-container"]//div//p');
        for(let i=0;i<=qutns.length-2;i++)
        {
            await qutns[i].click();
            await this.ClickOnNextBtn.click();

        }
        await this.page.locator('//div[@class="question-number-container"]//div//p').last().click();
        await this.ClickOnRevieweBtn.click();
        await this.ClickOnSubmitBtn.click();
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    }

    /**Method to start */
    async candidateStartExamsValidationInv(): Promise<void>{
        await this.ClickStartExamLink.click();
    }

    /**Method to enter Invigilator password */
    async enterInvgilatorPaswordAndClickOnNext(){
        await this.ClickStartExamLink.click();
        await this.EnterExaPassword.click();
        await this.page.waitForTimeout(5000);
        await this.EnterExaPassword.type('ABC09');
        await this.ClickOnStartExamBtn.click();
    }

    /**Method to Logout */
    async logoutClick(){
        await this.signOutBtn.click();
        await this.page.waitForTimeout(2000);
    }
}