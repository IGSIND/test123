import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { EluminaHomePage } from './EluminaHomePage';
import { properties } from 'properties';

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

let currentDate=new Date();
let StartBookingDate=currentDate.getDate().toString();
let EndExamDate=(currentDate.getDate()+1).toString();
// console.log(StartBookingDate);
// console.log(EndExamDate);

let hour = currentDate.getHours();
let period = '';

if (hour >= 12) {
  period = 'PM';
  if (hour > 12) {
    hour -= 12;
  }
} else {
  period = 'AM';
  if (hour === 0) {
    hour = 12;
  }
}

//console.log(`${period}`);
export class EluminaProctorExamPage {
    static examID:string;
    readonly page: Page;
    readonly context: BrowserContext;
    readonly EXAMSMENU: Locator;
    readonly CREATEEXAMS: Locator;
    readonly AUTHOR: Locator;
    readonly Admin:Locator;
    readonly STARTFROMSCRATCH: Locator;
    readonly SELECTBANK: Locator;
    readonly TESTBANK: Locator;
    readonly EXAMNAME: Locator;
    readonly EXAMCODE: Locator;
    readonly PracticeExam: Locator;
    readonly ProctoringExam: Locator;
    readonly BookingStartCalender: Locator;
    readonly BookingStartDate:Locator;
    readonly BookingStartHrs:Locator;
    readonly BooingStartMins:Locator;
    readonly ChooseBookingStartSession:Locator;
    readonly BookingOK:Locator;
    readonly BookingEndCalender:Locator;
    readonly BookingEndDate:Locator;
    readonly ExamStartCalender:Locator;
    readonly ExamStartDate:Locator;
    readonly ExamEndCalender:Locator;
    readonly ExamEndDate:Locator;
    readonly ClickOnExamVenue:Locator;
    readonly ChooseExamVenue:Locator;
    readonly ChooseExamVenue1:Locator;
    readonly ClickOnAdd:Locator;
    readonly EnterNoOfCandidates:Locator;
    readonly ClickOnNextBtn:Locator;
    readonly VerifyExam_details:Locator;
    readonly VerifyChoose_Question:Locator;
    readonly VerifyChoose_Workflow:Locator;
    readonly VerifyChoose_Confirmation:Locator;
    readonly CliCKOnCreateSection:Locator;
    readonly ClickOnCreateExamSection:Locator;
    readonly EnterSectionName:Locator;
    readonly DescriptionMessage:Locator;
    readonly SelectTime:Locator;
    readonly ClickOnSave:Locator;
    readonly ClickOnAddQuestion:Locator;
    readonly ClickOnSearchQuestion:Locator;
    readonly ClickOnSelectAllCheckBox:Locator;
    readonly ClickOnAddBtn:Locator;
    readonly ClickOnSubmitAndApproveBtn:Locator;
    readonly EnterInvigilatorPswd:Locator;
    readonly ClickOnCreateContentSection:Locator;
    readonly selectMinutes:Locator;
    readonly ClickonCreateContentPage:Locator;
    readonly ClickOnAddContent:Locator;
    readonly enterContentTitle:Locator;
    readonly ClickOnContentLayout:Locator;
    readonly ClickOnTermAndCondition:Locator;
    readonly ExamTools:Locator;
    readonly SelectNotepad:Locator;
    readonly SelectCalculator:Locator;
    readonly ClickOniProctoring:Locator;
    readonly ClickonEnableiProctorExtension:Locator;
    readonly ClickOnInternetConnection:Locator;
    readonly ClickonPromptCandidate:Locator;
    readonly ClickOnAdminSaveBtn:Locator;
    readonly fectchExamID:Locator;
    readonly CameraLink:Locator; 
    readonly MicrophoneLink:Locator;
    readonly BrowserCheckLink:Locator;   
    readonly nextButton:Locator;
    readonly Oneclick:Locator;


    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.Admin=page.locator('//div[contains(text(),"Assess App Admin")]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.CREATEEXAMS = page.locator('//button[normalize-space()="Create Exam"]')
        this.STARTFROMSCRATCH = page.locator('//p[normalize-space()="Start from Scratch"]')
        this.SELECTBANK = page.locator('//input[@placeholder="Select Bank"]');
        this.TESTBANK = page.locator('//span[contains(text(),"Elumina - Test Bank")]')
        this.EXAMNAME = page.locator('(//input[@name="inputbox"])[1]')
        this.EXAMCODE = page.locator('(//input[@name="inputbox"])[2]')
        this.PracticeExam = page.locator('(//span[@class="slider round"])[1]')
        this.ProctoringExam = page.locator('(//span[@class="slider round"])[2]');
        this.BookingStartCalender = page.locator('//div[@id="exam_booking_start_date_time"]//i[@class="glyphicon glyphicon-calendar"]');
        this.BookingStartDate= page.locator('#exam_booking_start_date_time').getByText(StartBookingDate, { exact: true });
        this.BookingStartHrs=page.getByRole('spinbutton').first();
        this.BooingStartMins=page.getByRole('spinbutton').nth(1);
        this.ChooseBookingStartSession=page.getByLabel(period);
        this.BookingOK=page.locator('.dtpc-ok-svg');
        this.BookingEndCalender=page.locator('#exam_booking_end_date_time i');
        this.BookingEndDate=page.locator('#exam_booking_end_date_time').getByText(StartBookingDate, { exact: true });
        this.ExamStartCalender=page.locator('#exam_start_date_time i');
        this.ExamStartDate=page.locator('#exam_start_date_time').getByText(StartBookingDate, { exact: true });
        this.ExamEndCalender=page.locator('#exam_end_date_time i');
        this.ExamEndDate=page.locator('#exam_end_date_time').getByText(EndExamDate, { exact: true });
        this.ClickOnExamVenue=page.getByPlaceholder('Select Exam Venue');
        this.ChooseExamVenue=page.getByRole('listitem').filter({ hasText: 'Elumina Chennai' }).locator('div');
        this.ChooseExamVenue1=page.getByRole('listitem').filter({ hasText: 'Practice Venue, Melbourne' }).locator('div');
        this.ClickOnAdd=page.getByRole('button', { name: 'Add' });
        this.EnterNoOfCandidates=page.getByRole('spinbutton');
        this.EnterInvigilatorPswd=page.locator('//input[@name="examInviglator"]');
        this.ClickOnNextBtn=page.locator('//button[normalize-space()="Next"]');
        this.VerifyExam_details=page.locator('//label[normalize-space()="1. Exam Details"]');
        this.VerifyChoose_Question=page.locator('//label[normalize-space()="2. Choose Questions"]');
        this.VerifyChoose_Workflow=page.locator('//label[normalize-space()="3. Choose Workflow"]');
        this.VerifyChoose_Confirmation=page.locator('//label[normalize-space()="4. Confirmation"]');
        this.CliCKOnCreateSection=page.locator('//i[@title="Create Section"]');
        this.ClickOnCreateExamSection=page.getByText('Create Exam Section');
        this.EnterSectionName=page.locator('#section_name').getByRole('textbox');
        this.DescriptionMessage=page.frameLocator('iframe[title="Rich Text Area\\. Press ALT-F9 for menu\\. Press ALT-F10 for toolbar\\. Press ALT-0 for help"]').locator('html');
        this.SelectTime=page.getByRole('combobox').nth(1);
        this.ClickOnSave=page.locator('//button[normalize-space()="Save"]');
        this.ClickOnCreateContentSection=page.getByText('Create Content Section');
        this.selectMinutes=page.getByRole('combobox').nth(1);
        this.ClickonCreateContentPage=page.locator('//i[@title="Create Content Page"]');
        this.ClickOnAddContent=page.locator('//div[@class="add_content"]');
        this.enterContentTitle=page.locator('//input[@name="inputbox"]');
        this.ClickOnContentLayout=page.locator('//input[@placeholder="Select Content Layout"]');
        this.ClickOnTermAndCondition=page.locator('//span[text()="Terms & Conditions"]');
        this.ClickOnAddQuestion=page.locator('//i[@title="Create Exam Question"]');
        this.ClickOnSearchQuestion=page.locator('//input[@placeholder="Search Question(s)"]');
        this.ClickOnSelectAllCheckBox=page.locator('//input[@id="selectall"]');
        this.ClickOnAddBtn=page.locator('//button[normalize-space()="Add"]');
        this.ClickOnSave=page.locator('//button[normalize-space()="Save"]');
        this.ClickOnNextBtn=page.locator('//button[normalize-space()="Next"]');
        this.ClickOnSubmitAndApproveBtn=page.locator('//button[normalize-space()="Submit & Approve"]');
        this.ExamTools=page.locator('(//div[@class="input-wrap"])[6]');
        this.SelectNotepad=page.locator('(//div[@class="dropdown-main"])[6]//ul//li[2]//span[text()="Notepad"]');
        this.SelectCalculator=page.locator('(//div[@class="dropdown-main"])[6]//ul//li[1]//span[text()="Calculator"]');
        this.ClickOniProctoring=page.locator('//span[contains(text(),"Proctoring")]');
        this.ClickonEnableiProctorExtension=page.locator('(//div[@class="switch--container"]//span)[5]');
        this.ClickOnInternetConnection=page.locator('(//span[@class="slider round"])[6]');
        this.ClickonPromptCandidate=page.locator('(//div[@class="labelVal-Create reqLabel"])[6]//input');
        this.ClickOnAdminSaveBtn=page.locator('//button[@class="btn primarybtn"]');
        this.fectchExamID=page.locator('//div[@class="label-text"]');
        this.CameraLink=page.locator('//div[@id="camera_link"]//input[@name="inputbox"]');
        this.MicrophoneLink=page.locator('//div[@id="microphone_link"]//input[@name="inputbox"]');
        this.BrowserCheckLink=page.locator('//div[@id="browsercheck_link"]//input[@name="inputbox"]');
        this.nextButton=page.locator('//li[@class="next"]');
        this.Oneclick=page.locator('(//li//span[text()="1"])[1]');
    }

    /**Method of Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaProctorExamPage(newPage);
    }

   /**Method of Admin Page Navigation */
    async AdminPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.Admin.click()
          ]);
           await newPage.waitForLoadState();
          return new exports.EluminaProctorExamPage(newPage);
    }

    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
          await this.EXAMSMENU.click();
    }

      /**Method to click on proctoring in Admin section*/
      async clickOnProctoringInAdmin(): Promise<void> {
        await this.ClickOniProctoring.click();
    }

     /**Method to validation on proctoring in Admin section*/
     async validationOfProctorExtension(): Promise<void> {
      await this.ClickonEnableiProctorExtension.scrollIntoViewIfNeeded();
      await this.ClickonEnableiProctorExtension.isVisible();
      console.log("Enable iProctor Extension option is not editable.");
  }

  /**Methods to enter Camera Link  */
  async enterCameraLink(){
    await this.CameraLink.click();
    await this.CameraLink.clear();
    await this.page.waitForTimeout(3000);
    await this.CameraLink.type('https://www.google.com/')
    await this.ClickOnSave.click();
  }

  /**Methods to enter Microphone Link  */
  async enterMicrophoneLink(){
    await this.MicrophoneLink.click();
    await this.MicrophoneLink.clear();
    await this.page.waitForTimeout(3000);
    await this.MicrophoneLink.type('https://www.facebook.com/')
    await this.ClickOnSave.click();
  }

  /**Method to enter descriptions */
  async enterTermAndCondition(){
    await this.DescriptionMessage.click();  
    await this.page.waitForTimeout(3000);
    await this.DescriptionMessage.type('All the best!!!');
    await this.ClickOnSave.click();
  }

  async enterBrowserLink(){
    await this.BrowserCheckLink.click();
    await this.BrowserCheckLink.clear();
    await this.page.waitForTimeout(3000);
    await this.BrowserCheckLink.type('https://linkedin.com/')
    await this.ClickOnSave.click();
  }

   /**Method to add prompt candidate message*/
   async validationOfPromptCandidateMessage(): Promise<void> {
    await this.ClickonPromptCandidate.scrollIntoViewIfNeeded();
    await this.ClickonPromptCandidate.click();
    await this.ClickonPromptCandidate.clear();
    await this.ClickonPromptCandidate.type('Please avoid using mobilephone while attending exam');
    await this.ClickOnAdminSaveBtn.click();
    console.log("Admin is able to setup prompt candidate message.");
}

  
     /**Method to click on Internet connection check in Admin section*/
     async clickOnInternetConnectionCheck(): Promise<void> {
      await this.ClickOnInternetConnection.click();
      await this.page.waitForTimeout(5000);
      console.log("Internet Connection check is turnOff");
      await this.ClickOnInternetConnection.click();
      console.log("Internet Connection check is turnOn");
  }

  /**Method to create practice exam*/
  async createPracticeExam(): Promise<void> {

    let currentDate=new Date();
    console.log(currentDate.getDate());
    let pm = currentDate.getHours() >= 12;
    let hour12 = currentDate.getHours() % 12;
    if (!hour12) 
      hour12 += 12;
    let minute = currentDate.getMinutes();
    console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);
    //console.log(localDate.)
    //let Hours=currentDate.getHours();
    //console.log(Hours);
    let StartBookingMin=currentDate.getMinutes()+1;
    let EndBookingMin=currentDate.getMinutes()+2;
    let StartExamMin=currentDate.getMinutes()+3;
    let EndExamMin=currentDate.getMinutes()+13;

    await expect(this.CREATEEXAMS).toBeVisible();
    await this.CREATEEXAMS.click();
    await this.STARTFROMSCRATCH.click();
    await this.SELECTBANK.click();
    await this.TESTBANK.click();
    await this.EXAMNAME.type('DEMO'+Math.floor(Math.random()*899999+100000));
    //await newPage.locator('//div[normalize-space()="Proctoring Exam"]//div[@id="Crm_Leads_COMPANY_label"]').scrollIntoViewIfNeeded();
    await this.EXAMCODE.type('D'+Math.floor(Math.random()*89+100));

    await this.PracticeExam.click();
    await this.ProctoringExam.click();
    //await this.page.waitForTimeout(5000);
    await this.BookingStartCalender.click();
   // await this.page.waitForTimeout(5000);
    await this.BookingStartDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
   // await this.BookingStartHrs.type(StartBookingMin.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    await this.BooingStartMins.type(StartBookingMin.toString());
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.BookingEndCalender.click();
    await this.BookingEndDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    await this.BooingStartMins.type(EndBookingMin.toString());
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.ExamStartCalender.click();
    await this.ExamStartDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    await this.BooingStartMins.type(StartExamMin.toString());
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.ExamEndCalender.click();
    if(EndExamDate>="30")
    {   
        await this.page.waitForSelector('//li[@class="next"]');
        await this.nextButton.click();
        await this.Oneclick.click();
    }
    else if(EndExamDate>="31")
    {   
        await this.page.waitForSelector('//li[@class="next"]');
        await this.nextButton.click();
        await this.Oneclick.click();
    }
    else{
      console.log("Exam end date:"+EndExamDate);
      await this.ExamEndDate.click();
    }
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    await this.BooingStartMins.type(EndExamMin.toString());
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();
    await this.ClickOnExamVenue.click();
    await this.ChooseExamVenue.click();
    await this.ClickOnAdd.click();
    await this.EnterNoOfCandidates.click();
    await this.EnterNoOfCandidates.clear();
    await this.EnterNoOfCandidates.type('01');
    await this.ClickOnAdd.click();
   // await this.EnterInvigilatorPswd.click();
    //await this.page.waitForTimeout(5000);
   // await this.EnterInvigilatorPswd.type('ABC09');
    // await this.page.waitForTimeout(5000);

    await this.ClickOnNextBtn.click();
    await expect(this.VerifyExam_details).toBeVisible();
    await expect(this.VerifyChoose_Question).toBeVisible();
    await expect(this.VerifyChoose_Workflow).toBeVisible();
    await expect(this.VerifyChoose_Confirmation).toBeVisible();
    await this.page.waitForTimeout(5000);
}

  /**Method to Create Common Exam */
  async createCommonExam(): Promise<void> {

    let currentDate=new Date();
    console.log(currentDate.getDate());
    let pm = currentDate.getHours() >= 12;
    let hour12 = currentDate.getHours() % 12;
    if (!hour12) 
      hour12 += 12;
    let minute = currentDate.getMinutes();
    console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);
 
    let StartBookingMin=currentDate.getMinutes()+1;
    let EndBookingMin=currentDate.getMinutes()+2;
    let StartExamMin=currentDate.getMinutes()+3;
    let EndExamMin=currentDate.getMinutes()+13;

    await expect(this.CREATEEXAMS).toBeVisible();
    await this.CREATEEXAMS.click();
    await this.STARTFROMSCRATCH.click();
    await this.SELECTBANK.click();
    await this.TESTBANK.click();
    await this.EXAMNAME.type('DEMO'+Math.floor(Math.random()*899999+100000));
  
    await this.EXAMCODE.type('D'+Math.floor(Math.random()*89+100));
    await this.ProctoringExam.click();
    await this.BookingStartCalender.click();

    await this.BookingStartDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());

    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    if(StartBookingMin >= 60)
    {
      StartBookingMin=1;
      await this.BooingStartMins.type(StartBookingMin.toString());
    }
    else{
      await this.BooingStartMins.type(StartBookingMin.toString());
   }
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.BookingEndCalender.click();
    await this.BookingEndDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    if(EndBookingMin >= 60)
    {
      EndBookingMin=2;
      await this.BooingStartMins.type(EndBookingMin.toString());
    }
    else{
      await this.BooingStartMins.type(EndBookingMin.toString());
    }
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.ExamStartCalender.click();
    await this.ExamStartDate.click();
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    if(StartExamMin >= 60)
    {
      StartExamMin=3;
      await this.BooingStartMins.type(StartExamMin.toString());
    }
    else{
      await this.BooingStartMins.type(StartExamMin.toString());
    }
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();
    await this.ExamEndCalender.click();
    if(EndExamDate>="30")
    {   
        await this.page.waitForSelector('//li[@class="next"]');
        await this.nextButton.click();
        await this.Oneclick.click();
    }
    else if(EndExamDate>="31")
    {   
        await this.page.waitForSelector('//li[@class="next"]');
        await this.nextButton.click();
        await this.Oneclick.click();
    }
    else{
      console.log("Exam end date:"+EndExamDate);
      await this.ExamEndDate.click();
    }
    await this.BookingStartHrs.click();
    await this.BookingStartHrs.clear();
    await this.BookingStartHrs.type(hour12.toString());
    await this.BooingStartMins.click();
    await this.BooingStartMins.clear();
    if(EndExamMin >= 60)
        {
            EndExamMin=1;
            await this.BooingStartMins.type(EndExamMin.toString());
        }
        else{
        await this.BooingStartMins.type(EndExamMin.toString());
        }
    await this.ChooseBookingStartSession.check();
    await this.BookingOK.click();

    await this.ClickOnExamVenue.click();
    await this.ChooseExamVenue.click();
    await this.ClickOnAdd.click();

    await this.EnterNoOfCandidates.click();
    await this.EnterNoOfCandidates.clear();
    await this.EnterNoOfCandidates.type('0100');
    await this.ClickOnAdd.click();
  }
    /**Method to create exam */
    async createExam(): Promise<void> {
        await this.createCommonExam();
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.page.waitForTimeout(5000);

        await this.ClickOnNextBtn.click();
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
    }

    /**Method to create exam without password*/
    async createExamwithoutpassword(): Promise<void> {
      await this.createCommonExam();
      await this.page.waitForTimeout(5000);
      await this.ClickOnNextBtn.click();
      await expect(this.VerifyExam_details).toBeVisible();
      await expect(this.VerifyChoose_Question).toBeVisible();
      await expect(this.VerifyChoose_Workflow).toBeVisible();
      await expect(this.VerifyChoose_Confirmation).toBeVisible();
      await this.page.waitForTimeout(5000);
  }

/*Create a Exam with Practice Venue, Melbourne Zone*/
async createExamwithDiffZone(): Promise<void> {

  let currentDate=new Date();
  let datecurrent=currentDate.getDate();
  console.log(datecurrent);
  let pm = currentDate.getHours() >= 12;
  let hour12 = currentDate.getHours() % 12;
  if (!hour12) 
    hour12 += 12;
  let minute = currentDate.getMinutes();
  console.log(`${hour12}:${minute} ${pm ? 'pm' : 'am'}`);

  let StartBookingMin=currentDate.getMinutes()+1;
  let EndBookingMin=currentDate.getMinutes()+2;
  let StartExamMin=currentDate.getMinutes()+3;
  let EndExamMin=currentDate.getMinutes()+14;

  await expect(this.CREATEEXAMS).toBeVisible();
  await this.CREATEEXAMS.click();
  await this.STARTFROMSCRATCH.click();
  await this.SELECTBANK.click();
  await this.TESTBANK.click();
  await this.EXAMNAME.type('DEMO'+Math.floor(Math.random()*899999+100000));
 
  await this.EXAMCODE.type('D'+Math.floor(Math.random()*89+100));
  await this.ProctoringExam.click();
  await this.BookingStartCalender.click();

  await this.BookingStartDate.click();
  await this.BookingStartHrs.click();
  await this.BookingStartHrs.clear();
  await this.BookingStartHrs.type(hour12.toString());

  await this.BooingStartMins.click();
  await this.BooingStartMins.clear();
  if(StartBookingMin >= 60)
  {
    StartBookingMin=1;
    await this.BooingStartMins.type(StartBookingMin.toString());
  }
  else{
    await this.BooingStartMins.type(StartBookingMin.toString());
  }
  
  await this.ChooseBookingStartSession.check();
  await this.BookingOK.click();

  await this.BookingEndCalender.click();
  await this.BookingEndDate.click();
  await this.BookingStartHrs.click();
  await this.BookingStartHrs.clear();
  await this.BookingStartHrs.type(hour12.toString());
  await this.BooingStartMins.click();
  await this.BooingStartMins.clear();
  if(EndBookingMin >= 60)
  {
    EndBookingMin=2;
    await this.BooingStartMins.type(EndBookingMin.toString());
  }
  else{
    await this.BooingStartMins.type(EndBookingMin.toString());
  }
  await this.ChooseBookingStartSession.check();
  await this.BookingOK.click();

  await this.ExamStartCalender.click();
  await this.ExamStartDate.click();
  await this.BookingStartHrs.click();
  await this.BookingStartHrs.clear();
  await this.BookingStartHrs.type(hour12.toString());
  await this.BooingStartMins.click();
  await this.BooingStartMins.clear();
  if(StartExamMin >= 60)
        {
          StartExamMin=3;
          await this.BooingStartMins.type(StartExamMin.toString());
        }
        else{
          await this.BooingStartMins.type(StartExamMin.toString());
        }
  await this.ChooseBookingStartSession.check();
  await this.BookingOK.click();

  await this.ExamEndCalender.click();
  if(EndExamDate=='31'|| '30'||'32')
    {   
        await this.page.waitForSelector('//li[@class="next"]');
        await this.nextButton.click();
        await this.Oneclick.click();
    }
    else{
      await this.ExamEndDate.click();
    }
  await this.BookingStartHrs.click();
  await this.BookingStartHrs.clear();
  await this.BookingStartHrs.type(hour12.toString());
  await this.BooingStartMins.click();
  await this.BooingStartMins.clear();
  if(EndExamMin >= 60)
  {
      EndExamMin=1;
      await this.BooingStartMins.type(EndExamMin.toString());
  }
  else{
  await this.BooingStartMins.type(EndExamMin.toString());
  }
  await this.ChooseBookingStartSession.check();
  await this.BookingOK.click();

  await this.ClickOnExamVenue.click();
  await this.ChooseExamVenue1.click();
  await this.ClickOnAdd.click();
  await this.EnterNoOfCandidates.click();
  await this.EnterNoOfCandidates.clear();
  await this.EnterNoOfCandidates.type('01');
  await this.ClickOnAdd.click();
}

     /*Create a Exam with All Tools*/
     async selectAllTools(){
        await this.EnterInvigilatorPswd.click();
        await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.ExamTools.click();
        await this.SelectCalculator.click();
        await this.SelectNotepad.click();
        await this.page.waitForTimeout(3000);
      //  await this.EnterInvigilatorPswd.click();
      //  await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
        await this.ClickOnNextBtn.click();
        await expect(this.VerifyExam_details).toBeVisible();
        await expect(this.VerifyChoose_Question).toBeVisible();
        await expect(this.VerifyChoose_Workflow).toBeVisible();
        await expect(this.VerifyChoose_Confirmation).toBeVisible();
        await this.page.waitForTimeout(5000);
     }


 /*Create a Exam with Note option*/
 async createExamWithNotepad(): Promise<void> {
  await this.createCommonExam();
  await this.EnterInvigilatorPswd.click();
  await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
  await this.ExamTools.click();
  await this.SelectNotepad.click();

  await this.ClickOnNextBtn.click();
  await expect(this.VerifyExam_details).toBeVisible();
  await expect(this.VerifyChoose_Question).toBeVisible();
  await expect(this.VerifyChoose_Workflow).toBeVisible();
  await expect(this.VerifyChoose_Confirmation).toBeVisible();
  await this.page.waitForTimeout(5000);
}

//**Methods to create exam with calculator */

async createExamWithCalculator(): Promise<void> {
  await this.createCommonExam();
  await this.EnterInvigilatorPswd.click();
  await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
  await this.page.waitForTimeout(5000);
  await this.ExamTools.click();
  await this.SelectCalculator.click();
  await this.ClickOnNextBtn.click();
  await expect(this.VerifyExam_details).toBeVisible();
  await expect(this.VerifyChoose_Question).toBeVisible();
  await expect(this.VerifyChoose_Workflow).toBeVisible();
  await expect(this.VerifyChoose_Confirmation).toBeVisible();
  await this.page.waitForTimeout(5000);
}

  async createSections(): Promise<string>{
    EluminaProctorExamPage.examID=await this.fectchExamID.textContent();
    console.log("Exam ID:"+EluminaProctorExamPage.examID);
    await this.CliCKOnCreateSection.click();
    await this.ClickOnCreateExamSection.click();
    await this.EnterSectionName.type('Exam-'+Math.floor(Math.random()*89+10));
    await this.page.waitForTimeout(5000);
    await this.DescriptionMessage.click();
    await this.DescriptionMessage.type(testData.DescriptionMessage);
    await this.page.waitForTimeout(5000);
    await this.SelectTime.selectOption('0');
    await this.SelectTime.selectOption('45');
    await this.ClickOnSave.click();
    return EluminaProctorExamPage.examID;

  }

    /**Method to create content section */
    async createContentSection():Promise<void>{
      await this.CliCKOnCreateSection.click();
      await this.ClickOnCreateContentSection.click();
      await this.EnterSectionName.type('Content-'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type(testData.DescriptionMessage);
      await this.page.waitForTimeout(5000);
      await this.selectMinutes.selectOption('1');
      await this.ClickOnSave.click();
    }

    //Creatr a Content Section Page
    async createContentPage():Promise<void>{
      await this.ClickonCreateContentPage.click();
      await this.ClickOnAddContent.click();
      await this.enterContentTitle.type('Content-A'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type(testData.DescriptionMessage);
      await this.page.waitForTimeout(5000);
      await this.ClickOnContentLayout.click();
      await this.ClickOnTermAndCondition.click();
      await this.ClickOnSave.click();

    }

    /**Method to create exam section */
    async createSection(): Promise<void>{
      await this.CliCKOnCreateSection.click();
      await this.ClickOnCreateExamSection.click();
      await this.EnterSectionName.type('Exam-'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type(testData.DescriptionMessage);
      await this.page.waitForTimeout(5000);
      await this.SelectTime.selectOption('1');
      await this.SelectTime.selectOption('30');
      await this.ClickOnSave.click();

    }

    /**Method to Add All Questions in Exam */
    async addQuestionsInExam(): Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click();
      await this.ClickOnSelectAllCheckBox.click();
      await this.ClickOnAddBtn.click();
      await this.ClickOnSave.click();
      await this.ClickOnNextBtn.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnSubmitAndApproveBtn.click();
      await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
      await this.page.waitForTimeout(5000);
    }

    /**Method to Add MCQ Questions and save in Exam */
    async addMCQQuestions():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('MCQ');
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector('//div[@class="eqc-question-info"]//input',{timeout:10000});
      const McqQuestions=await this.page.$$('//div[@class="eqc-question-info"]//input');
      for(let i=0;i<=McqQuestions.length-22;i++)
      {
        await McqQuestions[i].click();
      }
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
      await this.ClickOnNextBtn.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnSubmitAndApproveBtn.click();
      await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
      await this.page.waitForTimeout(5000);
    }

    
    /**Method to Add MCQ Questions in Exam */
    async addMCQQuestionswithoutSave():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('MCQ');
      await this.page.waitForTimeout(5000);
      await this.page.waitForSelector('//div[@class="eqc-question-info"]//input',{timeout:10000});
      const McqQuestions=await this.page.$$('//div[@class="eqc-question-info"]//input');
      for(let i=0;i<=McqQuestions.length-22;i++)
      {
        await McqQuestions[i].click();
      }
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
      // await this.ClickOnNextBtn.click();
      // await this.page.waitForTimeout(5000);
      // await this.ClickOnSubmitAndApproveBtn.click();
      // await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
      // await this.page.waitForTimeout(5000);
    }

    async addMCQQuestion():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('MCQ');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[2]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
    }

  /**Method to Create Multiple Candidates */
  async createExamforMultipleCandidates(): Promise<void> {
    await this.createCommonExam();
    await this.EnterInvigilatorPswd.click();
    await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
    await this.page.waitForTimeout(2000);
    await this.ClickOnNextBtn.click();
    await expect(this.VerifyExam_details).toBeVisible();
    await expect(this.VerifyChoose_Question).toBeVisible();
    await expect(this.VerifyChoose_Workflow).toBeVisible();
    await expect(this.VerifyChoose_Confirmation).toBeVisible();
    await this.page.waitForTimeout(5000);
  }

    async addVSAQQuestions():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('VSAQ');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[2]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
      await this.ClickOnNextBtn.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnSubmitAndApproveBtn.click();
    }

    async addVSAQQuestion():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('VSAQ');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[1]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
  }

  async addISAWEQuestion():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('ISAWE');
    await this.page.waitForTimeout(3000);
    await this.page.locator('(//input[@type="checkbox"])[1]').click();
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();
}

async addTypeXQuestion():Promise<void>{
  await this.ClickOnAddQuestion.click();
  await this.ClickOnSearchQuestion.click()
  await this.ClickOnSearchQuestion.type('Type X');
  await this.page.waitForTimeout(3000);
  await this.page.locator('(//input[@type="checkbox"])[1]').click();
  await this.ClickOnAddBtn.click()
  await this.ClickOnSave.click();
}

async addTypeBQuestion():Promise<void>{
  await this.ClickOnAddQuestion.click();
  await this.ClickOnSearchQuestion.click()
  await this.ClickOnSearchQuestion.type('Type B');
  await this.page.waitForTimeout(3000);
  await this.page.locator('(//input[@type="checkbox"])[1]').click();
  await this.ClickOnAddBtn.click()
  await this.ClickOnSave.click();
}

async addSAQQuestion():Promise<void>{
  await this.ClickOnAddQuestion.click();
  await this.ClickOnSearchQuestion.click()
  await this.ClickOnSearchQuestion.type('SAQ');
  await this.page.waitForTimeout(3000);
  await this.page.locator('(//input[@type="checkbox"])[1]').click();
  await this.ClickOnAddBtn.click()
  await this.ClickOnSave.click();

}

async addSJTQuestion():Promise<void>{
  await this.ClickOnAddQuestion.click();
  await this.ClickOnSearchQuestion.click()
  await this.ClickOnSearchQuestion.type('SJT');
  await this.page.waitForTimeout(3000);
  await this.page.locator('(//input[@type="checkbox"])[21').click();
  await this.ClickOnAddBtn.click()
  await this.ClickOnSave.click();
  await this.ClickOnNextBtn.click();
  await this.page.waitForTimeout(5000);
  await this.ClickOnSubmitAndApproveBtn.click();

}

}
    
