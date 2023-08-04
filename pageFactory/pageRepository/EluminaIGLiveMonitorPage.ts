
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

export class EluminaIGLiveMonitorPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly InvUsername:Locator;
    readonly InvPssword:Locator;
    readonly InvLoginBtn:Locator;
    readonly AUTHOR: Locator;
    readonly ClickOnExam:Locator;
    readonly CheckExamStatus:Locator;
    readonly AllCandCheckbox:Locator;
    readonly OneCandCheckbox:Locator;
    readonly IsPresentYes:Locator;
    readonly IsPresentNo:Locator;
    readonly LockExam:Locator;
    readonly SelectLocation:Locator;
    readonly LocationDrop:Locator;
    readonly LocationSubmit:Locator;
    readonly SelectAll:Locator;
    readonly dropDown:Locator;        

            constructor(page: Page, context: BrowserContext) {
                this.page = page;
                this.context = context;
                webActions = new WebActions(this.page, this.context);
                this.InvUsername=page.locator('(//input)[1]');
                this.InvPssword=page.locator('(//input)[2]');
                this.InvLoginBtn=page.locator('//*[@class="submit-butn"]');
                this.AUTHOR = page.locator('//div[text()="iAuthor"]');
                this.ClickOnExam=page.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]');
                this.CheckExamStatus=page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[11]//span');
                this.AllCandCheckbox=page.locator('//table[@class="table table-spacing"]//thead//tr//th[2]//input');
                this.OneCandCheckbox=page.locator('//table[@class="table table-spacing"]//tbody//tr//td[2]//input');
                this.IsPresentYes=page.locator('//select');
                this.IsPresentNo=page.locator('//tbody//tr//td//select//option[1]');
                this.LockExam=page.locator('//div[@title="Lock Exam for all Candidates"]');
                this.SelectLocation=page.locator('//input[@placeholder="Select Location"]');
                this.LocationDrop=page.locator('(//span[@class="open"][text()="Elumina Chennai"])[1]');
                this.LocationSubmit=page.locator('//div[@title="Submit"]');
                this.SelectAll=page.locator('//span[@class="thtext"]//input[@type="checkbox"]')
                this.dropDown=page.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[2]');

            }
            async invigilatorLogin():Promise<void>{
                await this.page.goto("/");
                await this.InvUsername.type(testData.invigilatorUsername);
                await this.InvPssword.type(testData.invigilatorPassword);
                await this.InvLoginBtn.click();
            }
            async iAuthorPageNavigation() {
                const [newPage] = await Promise.all([
                    this.context.waitForEvent('page'),
                    await this.AUTHOR.click()
                  ]);
                  await newPage.waitForLoadState();
                  return new exports.EluminaIGLiveMonitorPage(newPage);
            }

            async iAuthorPageVerification() {
               await this.ClickOnExam.click();
          
            }
            async markAllAttendance() {
                let markattd1=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');
                await markattd1.click();
                await markattd1.selectOption('Yes');
                let markattd2=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');
                await markattd2.click();
                await markattd2.selectOption('Yes');
                await this.page.waitForTimeout(2000);
               
            }
            async oneCandCheckbox() {
                await this.OneCandCheckbox.click();
            }
            async isPresentYes() {
                let markattd1=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');
                await markattd1.click();
                await markattd1.selectOption('Yes');
                await this.page.waitForTimeout(5000);
            }
            async isPresentNo() {
                await this.IsPresentNo.click();
            }
            async lockExamBtn() {
                await this.LockExam.click();
            }
            async selectLocation() {
               await this.SelectAll.check();
               await this.dropDown.click();
               await this.LocationDrop.click();
               await this.LocationSubmit.click();
               await this.page.waitForTimeout(5000);
            }
            async locationDrop() {
                await this.LocationDrop.click();
                await this.page.waitForTimeout(5000);
            }
            async locationSubmit() {
                await this.LocationSubmit.click();
            }  

          async validateExamStatus(){
                let Examstatus=await this.CheckExamStatus.textContent();
                console.log(Examstatus);
                await this.CheckExamStatus.isVisible();
          }
      }