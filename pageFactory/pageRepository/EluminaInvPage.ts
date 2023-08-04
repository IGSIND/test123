import { Page, BrowserContext, Locator, expect, ElementHandle } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaProctorExamPage } from "./EluminaProctorExamPage";
import { EluminaExamPage } from "./EluminaExamPage";

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

export class EluminaInvPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly InvUsername:Locator;
    readonly InvPssword:Locator;
    readonly InvLoginBtn:Locator;
    readonly AUTHOR: Locator;
    readonly verifyDashboardTitle:Locator;
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

    readonly verifyExamIDMenue:Locator;
    readonly verifyExamNameMenue:Locator;
    readonly verifyExamStartDateMenue:Locator;
    readonly verifyExamEndDateMenue:Locator;
    readonly verifyExamStatusMenue:Locator;
    readonly verifyExamDurationMenue:Locator;
    readonly verifyExamVenueMenue:Locator;

    readonly verifyExamID:Locator;
    readonly verifyExamName:Locator;
    readonly verifyExamStartDate:Locator;
    readonly verifyExamEndDate:Locator;
    readonly verifyExamStatus:Locator;
    readonly verifyExamDuration:Locator;
    readonly verifyExamVenue:Locator;
    readonly ClickOnExam1:Locator;
    readonly verifyCandNAme:Locator;
    readonly verifyErrorMessage:Locator;
    readonly MenuIconClick:Locator;
    readonly logoutbuttonClick:Locator;

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

        this.verifyDashboardTitle=page.locator('//h4[text()="Dashboard"]');

        this.verifyExamIDMenue=page.locator('//table[@class="table"]//thead//tr//th[1]');
        this.verifyExamNameMenue=page.locator('//table[@class="table"]//thead//tr//th[2]');
        this.verifyExamStartDateMenue=page.locator('//table[@class="table"]//thead//tr//th[3]');
        this.verifyExamEndDateMenue=page.locator('//table[@class="table"]//thead//tr//th[4]');
        this.verifyExamStatusMenue=page.locator('//table[@class="table"]//thead//tr//th[5]');
        this.verifyExamDurationMenue=page.locator('//table[@class="table"]//thead//tr//th[6]');
        this.verifyExamVenueMenue=page.locator('//table[@class="table"]//thead//tr//th[7]');

        this.verifyExamID=page.locator('(//table[@class="table"]//tbody//tr[1]//td[1]//span)[1]');
        this.verifyExamName=page.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]');
        this.verifyExamStartDate=page.locator('(//table[@class="table"]//tbody//tr[1]//td[3]//span)[1]');
        this.verifyExamEndDate=page.locator('(//table[@class="table"]//tbody//tr[1]//td[4]//span)[1]');
        this.verifyExamStatus=page.locator('(//table[@class="table"]//tbody//tr[1]//td[5]//span)[1]');
        this.verifyExamDuration=page.locator('(//table[@class="table"]//tbody//tr[1]//td[6]//span)[1]');
        this.verifyExamVenue=page.locator('(//table[@class="table"]//tbody//tr[1]//td[7]//span)[1]');

        this.ClickOnExam1=page.locator('(//table[@class="table"]//tbody//tr[1]//td[2]//span)[1]');
        this.verifyCandNAme=page.locator('//table[@class="table table-spacing"]//tbody//tr[1]//td[6]//span');
        this.verifyErrorMessage=page.locator('//div[text()="Invalid username or password."]'); 
        this.SelectLocation=page.locator('//input[@placeholder="Select Location"]');
        this.LocationDrop=page.locator('(//span[@class="open"][text()="Elumina Chennai"])[1]');
        this.LocationSubmit=page.locator('//div[@title="Submit"]');
        this.SelectAll=page.locator('//span[@class="thtext"]//input[@type="checkbox"]');
        this.dropDown=page.locator('(//div[@class="msdd-triangle open msdd-triangle-down"])[2]');
        this.MenuIconClick=page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick=page.locator('//a[normalize-space()="Log out"]');
    }

    /**Method to login as invigilator */
    async invigilatorLogin():Promise<void>{
        await this.page.goto("/");
        await this.InvUsername.type(testData.invigilatorUsername);
        await this.InvPssword.type(testData.invigilatorPassword);
        await this.page.waitForTimeout(1000);
        await this.InvLoginBtn.click();
        await this.page.waitForTimeout(2000);
    }

    /**Method to check with invaild Invigilator login */
    async invalidInvigilatorLogin():Promise<void>{
      await this.page.goto("/");
      await this.InvUsername.type(testData.invaildInvigilatorUsername);
      await this.InvPssword.type(testData.invaildInvigilatorPassword);
      await this.InvLoginBtn.click();
      await expect(this.verifyErrorMessage).toBeVisible();
      console.log(await this.verifyErrorMessage.textContent());
  }

  /**Method for page navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaInvPage(newPage);
    }

    /**Method for iAuthor Page Verification */
    async iAuthorPageVerification() {
          await expect(this.verifyDashboardTitle).toBeVisible();
          console.log("Invigilator-"+await this.verifyDashboardTitle.textContent())
          //await this.ClickOnExam.click();
    }

    /**Method for Invigilator Dashboard Validation */
    async invDashboardValidations() {
      await this.page.waitForTimeout(10000);
      await expect(this.verifyExamIDMenue).toBeVisible();
      console.log(await this.verifyExamIDMenue.textContent()+"-"+await this.verifyExamID.textContent());
      await expect(this.verifyExamNameMenue).toBeVisible();
      console.log(await this.verifyExamNameMenue.textContent()+"-"+await this.verifyExamName.textContent());
      await expect(this.verifyExamStartDateMenue).toBeVisible();
      console.log(await this.verifyExamStartDateMenue.textContent()+"-"+await this.verifyExamStartDate.textContent());
      await expect(this.verifyExamEndDateMenue).toBeVisible();
      console.log(await this.verifyExamEndDateMenue.textContent()+"-"+await this.verifyExamEndDate.textContent());
      await expect(this.verifyExamStatusMenue).toBeVisible();
      console.log(await this.verifyExamStatusMenue.textContent()+"-"+await this.verifyExamStatus.textContent());
      await expect(this.verifyExamDurationMenue).toBeVisible();
      console.log(await this.verifyExamDurationMenue.textContent()+"-"+await this.verifyExamDuration.textContent());
      await expect(this.verifyExamVenueMenue).toBeVisible();
      console.log(await this.verifyExamVenueMenue.textContent()+"-"+await this.verifyExamVenue.textContent());
      await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
      await this.page.waitForTimeout(2000);
  }

  /**Method to Verify Exam status */
    async validateExamStatus(){
       let Examstatus=await this.CheckExamStatus.textContent();
       console.log(Examstatus);
       await this.CheckExamStatus.isVisible();
    }

  /**Method to verify candidate name */
  async invClickOnExam() {

    let examid= EluminaExamPage.examID;
    console.log("From Registeration"+EluminaExamPage.examID);

    let examIdProc=EluminaProctorExamPage.examID;
    console.log("exam-id Proc"+EluminaProctorExamPage.examID)

    await this.page.waitForSelector('//table[@class="table"]//tbody//tr//td[2]//span//span//span')
    let exam=await this.page.$$('//table[@class="table"]//tbody//tr//td[2]//span//span//span');

    console.log("Exam list:"+exam);
    for(let i=0;i<=exam.length-1;i++){

            let ex=await exam[i].textContent();
            console.log("exam:"+ex);
            if(examid==ex)
            {   
                console.log("Examid inside:"+examid);
                const clickableExam: ElementHandle<Element> = exam[i] as ElementHandle<Element>;
                await clickableExam.click();
            }
            else if(examIdProc==ex){
                console.log("Examid inside proc:"+examIdProc);
                const clickableExamProc: ElementHandle<Element> = exam[i] as ElementHandle<Element>;
                await clickableExamProc.click();
            }
    }

    let CandNAme=await this.verifyCandNAme.textContent();
    console.log(CandNAme);
    await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    await this.page.waitForTimeout(3000);
  }

    /**Method to select Location */  
    async selectLocation() {
        await this.ClickOnExam1.click();
        await this.SelectAll.check();
        await this.dropDown.click();
        await this.LocationDrop.click();
        await this.LocationSubmit.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on exam link */  
    async ClickOnExamLink() {
        await this.ClickOnExam.click();

    }

    /**Method to Mark all attendence */
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

    /**Method to mark attendence with yes */
    async isPresentYes() {
        let markattd1=this.page.locator('(//table[@class="table table-spacing"]//tbody//tr//td[3]//select)[1]');
        await markattd1.click();
        await markattd1.selectOption('Yes');
        await this.page.waitForTimeout(5000);
    }

     /**Method to mark attendence with No */
    async isPresentNo() {
        await this.IsPresentNo.click();
    }

    /**Method to click on Lock Exam Button */
    async lockExamBtn() {
        await this.LockExam.click();
    }

    /**Method to select location */
    async selectLocation1() {
        await this.SelectAll.check();
        await this.dropDown.click();
        await this.LocationDrop.click();
        await this.LocationSubmit.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on loction drop down */
    async locationDrop() {
        await this.LocationDrop.click();
        await this.page.waitForTimeout(5000);
    }

    /**Method to click on location submit */
    async locationSubmit() {
            await this.LocationSubmit.click();
    }  

    /**Method for Logout */
    async logoutClick(){
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();
      
    }
}