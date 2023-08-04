import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaProctorExamPage } from './EluminaProctorExamPage';
import { EluminaMultipleExamsForAMPage }from './EluminaMultipleExamsForAMPage';
import { EluminaMultipleExamsForPMPage } from './EluminaMultipleExamsForPMPage';
import { EluminaExamPage } from './EluminaExamPage';
import { EluminaExamInvPage } from './EluminaExamInvPage';

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

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let candClientID:string;

export class EluminaRegistrationForProctoringPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly AUTHOR: Locator;
    readonly RegistrationMenu: Locator;
    readonly ClickOnCreatedExam:Locator;
    readonly ClickOnAddNewUsers:Locator;

    readonly EnterClientID:Locator;
    readonly ChooseTitle:Locator;
    readonly TypeUsername:Locator;
    readonly TypeFirstName:Locator;
    readonly TypeLastName:Locator;
    readonly TypeEmail:Locator;
    readonly TypePhone:Locator;
    readonly SelectRole:Locator;
    readonly SelectEligible:Locator;
    readonly SelectVenue:Locator;
    readonly SelectBookingStatus:Locator;
    readonly ClickOnSaveBtn:Locator;
    readonly LeftArrow:Locator;
    readonly ClickOnDropdown:Locator;
    readonly ClickOnDownloadUserDeatils:Locator; 
    readonly ClickProfileImage:Locator;

    readonly ClickOnAddExistingUser:Locator;
    readonly SearchUsers:Locator;
    readonly CLickOnUser:Locator;
    readonly ChooseExistingRole:Locator;
    readonly SelectInvRole:Locator;
    readonly SelectCandRole:Locator;
    readonly SelectExVenue:Locator;
    readonly SelectInvVenue:Locator;
    readonly SelectCadVenue:Locator;
    readonly SelectExEligible:Locator;
    readonly SelectInvEligible:Locator;
    readonly SelectExBookingStatus:Locator;
    readonly SelectInvBookingStatus:Locator;
    readonly AssignUsersToCand:Locator;
    readonly AssignInvToCand:Locator;
    readonly ClickOnInvSaveBtn:Locator;
    readonly ClickOnDropdown2:Locator;
    readonly ClickOnAssignInv:Locator;
    readonly captureUserClientID:Locator;
    readonly clcikOnLiveMonitor:Locator;
    readonly clickOnProImage:Locator;
    readonly clickOnCadidateName:Locator;
    readonly verifyCadStatusAsAdmin:Locator;
    readonly liveMonitor:Locator;
    readonly liveMonitorIcon:Locator;
    readonly candidateCard:Locator;
    readonly hardwareInternetcheck:Locator;    
    readonly searchExam:Locator;
    readonly MenuIconClick:Locator;
    readonly logoutbuttonClick:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.RegistrationMenu = page.locator('//a[text()="Registration"]');
        this.ClickOnCreatedExam=page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//a');
        this.ClickOnAddNewUsers=page.locator('//a[normalize-space()="Add New Users"]');

        this.EnterClientID=page.locator('//table[@class="table"]//tbody//tr[1]//td[2]//input');
        this.ChooseTitle=page.locator('//table[@class="table"]//tbody//tr[1]//td[3]//select');
        this.TypeUsername=page.locator('//table[@class="table"]//tbody//tr[1]//td[4]//input');
        this.TypeFirstName=page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//input');
        this.TypeLastName=page.locator('//table[@class="table"]//tbody//tr[1]//td[6]//input');
        this.TypeEmail=page.locator('//table[@class="table"]//tbody//tr[1]//td[7]//input');
        this.TypePhone=page.locator('//table[@class="table"]//tbody//tr[1]//td[8]//input');
        this.SelectRole=page.locator('//table[@class="table"]//tbody//tr[1]//td[9]//select');
        this.SelectEligible=page.locator('//table[@class="table"]//tbody//tr[1]//td[10]//select');
        this.SelectVenue=page.locator('//table[@class="table"]//tbody//tr[1]//td[11]//select');
        this.SelectBookingStatus=page.locator('//table[@class="table"]//tbody//tr[1]//td[12]//select');
        this.ClickOnSaveBtn=page.locator('//button[@class="theme-btn theme-primary-btn"]');
        this.LeftArrow=page.locator('//i[@class="iconBg leftArrow"]');
        this.ClickOnDropdown=page.locator('(//a[@class="icon dropdown-toggle"])[1]');
        this.ClickOnDropdown2=page.locator('(//a[@class="icon dropdown-toggle"])[2]');
        this.ClickOnDownloadUserDeatils=page.locator('(//p[text()="Download User details"])[1]');
        this.ClickOnAssignInv=page.locator('(//p[text()="Assign Invigilator"])[1]');

        this.ClickOnAddExistingUser=page.locator('//a[normalize-space()="Add Existing Users"]');
        this.SearchUsers=page.locator('//input[@placeholder="Search User(s)"]');
        this.CLickOnUser=page.locator('//tbody/tr[1]/td[2]/input[1]');
        this.ChooseExistingRole=page.locator('//div[@class="btn-selected-list"]//div//ul');
        this.SelectInvRole=page.locator('//span[text()="Examiner-in-Charge"]');
        this.SelectCandRole=page.locator('//span[text()="Candidate"]');
        this.SelectExVenue=page.locator('//input[@placeholder="Select Venue"]');
        this.SelectInvVenue=page.locator('//span[text()="Elumina Chennai"]');
        this.SelectCadVenue=page.locator('//span[text()="Practice Venue, Melbourne"]')
        this.SelectExEligible=page.locator('//input[@placeholder="Select Eligible"]');
        this.SelectInvEligible=page.locator('//span[text()="Yes"]');
        this.SelectExBookingStatus=page.locator('//input[@placeholder="Select Booking Status"]');
        this.SelectInvBookingStatus=page.locator('//span[text()="Booked"]');
        this.AssignUsersToCand=page.locator('//input[@placeholder="Select User(s)"]');
       // this.AssignInvToCand=page.locator('//span[text()="Incharge Exam"]');
        this.AssignInvToCand=page.locator('(//span[@class="open"])[5]');
        this.ClickOnInvSaveBtn=page.locator('(//button[text()="Save"])[2]');

        this.captureUserClientID=page.locator('//table[@class="table"]//tbody//tr[1]//td[5]//div//div//span');
        this.clcikOnLiveMonitor=page.locator('//a[normalize-space()="Live Monitor"]');
        this.clickOnProImage=page.locator('//*[@class="proctoringImg"]');
        this.clickOnCadidateName=page.locator('(//div[@class="candidate-name"]//div[1])[1]');
        this.verifyCadStatusAsAdmin=page.locator('//div[@class="status"]');
        this.liveMonitor=page.locator('//a[text()="Live Monitor"]');
        this.liveMonitorIcon=page.locator('//img[@class="proctoringImg"]');
        this.candidateCard=page.locator('(//div[@class="candidate-name"]//div[1])[1]');
        this.hardwareInternetcheck=page.locator('//div[contains(text(),"Hardware / Internet Check Pass")]');
        this.MenuIconClick=page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick=page.locator('//a[normalize-space()="Log out"]');
        this.searchExam=page.locator('//input[@placeholder="Search Exam(s)"]');
        const examId:string=String(EluminaProctorExamPage.examID);
        const examId1:string=String(EluminaExamInvPage.examID);
        console.log(examId);
    }

      //**Method to navogate new Tab */
    async iAuthorPageNavigations() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaRegistrationForProctoringPage(newPage);
    }


    /**Method to click on Registration Menu,click on Created Exam and click on Add new users */
    async registrationTabNavigation():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaProctorExamPage.examID;
        console.log(EluminaProctorExamPage.examID);
        await this.searchExam.type(examid);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

     /**Method to click on Registration Menu,click on Created Exam and click on Add new users */
     async registrationTabNavigationforEluminaExamPage():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaExamPage.examID;
        console.log(EluminaExamPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    async registrationTabNavigationforEluminaInvExamPage():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaExamInvPage.examID;
        console.log(EluminaExamInvPage.examID);
        await this.searchExam.type(examid);
        await this.page.waitForTimeout(5000);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to click on Registration Menu,click on Created Exam and click on Add new users */
    async registrationTabNavigationforAM():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaMultipleExamsForAMPage.examID;
        console.log(EluminaMultipleExamsForAMPage.examID);
        await this.searchExam.type(examid);
        await this.ClickOnCreatedExam.click();
        await this.ClickOnAddNewUsers.click();
    }

    /**Method to click on Registration Menu,click on Created Exam and click on Add new users */
    async registrationTabNavigationforPM():Promise<void> {
        await this.RegistrationMenu.click();
        let examid= EluminaMultipleExamsForPMPage.examID;
        console.log(EluminaMultipleExamsForPMPage.examID);
        await this.searchExam.type(examid);
        await this.ClickOnCreatedExam.click();
        //await this.ClickOnAddNewUsers.click();
    }

    /**Method to click on Registration Menu and click on Created Exam  */
    async registrationTabNavigationByClickCreateExam(){
        await this.RegistrationMenu.click();
        await this.ClickOnCreatedExam.click();
        }

        /**Metods to click on Live Monitor as a Admin */
    async clickOnLiveMonitorAdmin(){
        await this.clcikOnLiveMonitor.click();
    }

      /**Metods to click on Image and candidateName Monitor as a Admin */
      async clickOnImageandCadidate(){
        await this.clickOnProImage.click();
        await this.clickOnCadidateName.click();
    }
      /**Metthods to verify Cadidate status */
    async verifyCadStatus(){
       let status=await this.verifyCadStatusAsAdmin.textContent();
       await this.page.waitForTimeout(3000);
       console.log("Cadidate status:"+status);
    }
        /**Methods to verify Videos fragment */
    async verifyTimeVideofragment(){
        await this.page.waitForSelector('//div[@class="fragment-item"]//div[@class="time"]',{timeout:10000});
       let videos=await this.page.$$('//div[@class="fragment-item"]//div[@class="time"]');
       for(let i=0;i<=videos.length-1;i++)
      {
        let videotime=await videos[i].textContent();
        console.log("Video fragment time:"+videotime);
      }
     }
    /**Methods to verify Screenshots */
     async verifyTimeScreenshotst(){
        await this.page.waitForSelector('//div[@class="screenshot-item"]//div[@class="time"]',{timeout:10000});
       let screenshots=await this.page.$$('//div[@class="screenshot-item"]//div[@class="time"]');
       for(let i=0;i<=screenshots.length-1;i++)
      {
        let screenshot=await screenshots[i].textContent();
        console.log("Screenshot time:"+screenshot);
      }
     }

    /**Methods to fetch events as admin */
      async fetchEvents()
      {
        await this.page.waitForSelector('//div[@class="event-item"]',{timeout:10000});
        let events=await this.page.$$('//div[@class="event-item"]');
        const Ttl=events.length-1;
        for(let i=0;i<=events.length-1;i++)
        {
           let event=await events[i].textContent();
           console.log(event);

        }
      }

        /**Methods to fetch answers as admin */
        async fetchAnswers()
        {
          await this.page.waitForSelector('//div[@class="question-list scroll"]//div[contains(@style,"background-color: ")]',{timeout:10000});
          let events=await this.page.$$('//div[@class="question-list scroll"]//div[contains(@style,"background-color: ")]');
          const Ttl=events.length-1;
          for(let i=0;i<=events.length-1;i++)
          {
             let event=await events[i].textContent();
             console.log("Questions:"+event);
  
          }
        }
    

    /**Method to Add User Details */
    async addUserDetails():Promise<void>{
        await this.EnterClientID.type(makeid(testData.clientId)+Math.floor(Math.random()*899+100));
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption('Mr');
        await this.TypeUsername.type(makeid(testData.clientUsername)+Math.floor(Math.random()*89+10));
        await this.TypeFirstName.type(makeid(testData.clientFirstname));
        await this.TypeLastName.type(makeid(testData.clientLastname));
        await this.TypeEmail.type(makeid(testData.clientEmail)+Math.floor(Math.random()*899+100)+'@gmail.com');
        await this.TypePhone.type(testData.clientPhone+Math.floor(Math.random()*899999999+100));
        await this.page.waitForTimeout(5000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption(testData.clientRole);
        await this.page.waitForTimeout(5000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption(testData.clientEligableOption);
        await this.page.waitForTimeout(5000);
        await this.SelectVenue.click();
        await this.SelectVenue.type(testData.clientVenue);
        await this.page.waitForTimeout(5000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption(testData.clientBookingStatus);
        await this.page.waitForTimeout(5000);
        await this.page.locator('(//input[@name="profile_image"])[1]').setInputFiles('lib/Images/kohli.jpeg');
        await this.page.waitForTimeout(8000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(8000);
        await this.LeftArrow.click();
        candClientID=await this.captureUserClientID.textContent()
        console.log("Cand-ID :"+candClientID);
        await this.ClickOnDropdown.click();
    }

    /**Method to Download the User Details */
    async downloadUserDetails():Promise<void>{
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
       // Wait for the download process to complete.
       console.log(await download.path());
       const suggestedFileName = download.suggestedFilename();
       const filePath = 'download/' + suggestedFileName
       await download.saveAs(filePath)
       await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
       await this.page.waitForTimeout(4000);
    }

    /**Method to Add invigilator to the exam */
    async addExistingUsers():Promise<void>{
        await this.ClickOnAddExistingUser.click();
        await this.SearchUsers.click();
        await this.SearchUsers.type(testData.invigilatorName);
        await this.page.waitForTimeout(7000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectInvRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(7000);
        await this.LeftArrow.click();
        await this.ClickOnDropdown2.click();
        await this.ClickOnAssignInv.click();
        await this.AssignUsersToCand.click();
        await this.AssignInvToCand.click();
        await this.ClickOnInvSaveBtn.click();
        await this.page.waitForTimeout(5000);
    }

    /**add Existing Cadidate In Diff Time Zone */
    async addExistingUsers1():Promise<void>{
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectCadVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(3000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForTimeout(2000);

    }

     /**add Existing Candid */
     async addExistingUsersforMultiple():Promise<void>{
        await this.ClickOnAddExistingUser.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.click();
        await this.page.waitForTimeout(2000);
        await this.SearchUsers.type(candClientID);
        await this.page.waitForTimeout(4000);
        await this.CLickOnUser.click();
        await this.ChooseExistingRole.click();
        await this.SelectCandRole.click();
        await this.SelectExVenue.click();
        await this.SelectInvVenue.click();
        await this.SelectExEligible.click();
        await this.SelectInvEligible.click();
        await this.SelectExBookingStatus.click();
        await this.SelectInvBookingStatus.click();
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(7000);
        await this.LeftArrow.click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForTimeout(2000);
        await this.ClickOnDropdown.click();
    }

    /**Method to Add Multiple User Details */
    async addMultipleUserDetails():Promise<void>{
        await this.page.waitForSelector('//table[@class="table"]//tbody//tr',{timeout:10000});
        let rowss=await this.page.$$('//table[@class="table"]//tbody//tr');
        for(let i=0;i<=2;i++)
        { 
        await rowss[i].isVisible()
        await this.EnterClientID.clear();
        await this.EnterClientID.type(testData.clientId+Math.floor(Math.random()*89976543+10023));
        await this.page.waitForTimeout(1000);
        await this.ChooseTitle.click();
        await this.ChooseTitle.selectOption(testData.clientGender);
        await this.TypeUsername.clear();
        await this.TypeUsername.type(testData.clientUsername+Math.floor(Math.random()*896565+1098));
        await this.TypeFirstName.clear();
        await this.TypeFirstName.type(testData.clientFirstname);
        await this.TypeLastName.clear();
        await this.TypeLastName.type(testData.clientLastname);
        await this.TypeEmail.clear();
        await this.TypeEmail.type(testData.clientEmail+Math.floor(Math.random()*8995467+1003245)+'@gmail.com');
        await this.TypePhone.clear();
        await this.TypePhone.type(testData.clientPhone+Math.floor(Math.random()*899999999+10000));
        await this.page.waitForTimeout(1000);
        await this.SelectRole.click();
        await this.SelectRole.selectOption(testData.clientRole);
        await this.page.waitForTimeout(1000);
        await this.SelectEligible.click();
        await this.SelectEligible.selectOption(testData.clientEligableOption);
        await this.page.waitForTimeout(1000);
        await this.SelectVenue.click();
        await this.SelectVenue.type(testData.clientVenue);
        await this.page.waitForTimeout(1000);
        await this.SelectBookingStatus.click();
        await this.SelectBookingStatus.selectOption(testData.clientBookingStatus);
        await this.page.waitForTimeout(1000);
        await this.page.locator('(//input[@name="profile_image"])[1]').setInputFiles('./lib/Image.png');
        await this.page.waitForTimeout(1000);
        await this.ClickOnSaveBtn.click();
        await this.page.waitForTimeout(2000);
        }
        await this.LeftArrow.click();
     }

     /**Method to Download the Multiple User Details */
    async downloadMultipleUserDetails():Promise<void>{
        for(let i=0;i<=2;i++){
        await this.ClickOnDropdown.click();
        const downloadPromise = this.page.waitForEvent('download');
        await this.ClickOnDownloadUserDeatils.click();
        const download = await downloadPromise;
        // Wait for the download process to complete.
        console.log(await download.path());
        const suggestedFileName = download.suggestedFilename();
        const filePath = 'download/' + suggestedFileName
        await download.saveAs(filePath)
        await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
        await this.page.waitForTimeout(4000);
        }
    }

       /**Method to click on Registration Menu,click on Created Exam */
       async registrationTabNavigationforLiveMonitor():Promise<void> {
        await this.RegistrationMenu.click();
        await this.ClickOnCreatedExam.click();
        await this.liveMonitor.click();
        await this.liveMonitorIcon.click();
        await this.candidateCard.click();
        await this.hardwareInternetcheck.isVisible();
        let hardwareInternet=await this.hardwareInternetcheck.textContent();
        console.log(hardwareInternet);
        
    }

    /**Method for logout */
    async logoutClick(){
        await this.MenuIconClick.click();
        await this.logoutbuttonClick.click();
      
    }
  
}