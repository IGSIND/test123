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
// console.log(`${period}`);

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


export class EluminaExamPage {
    static examID:string;
    readonly page: Page;
    readonly context: BrowserContext;
    readonly EXAMSMENU: Locator;
    readonly CREATEEXAMS: Locator;
    readonly AUTHOR: Locator;
    readonly STARTFROMSCRATCH: Locator;
    readonly SELECTBANK: Locator;
    readonly TESTBANK: Locator;
    readonly EXAMNAME: Locator;
    readonly EXAMCODE: Locator;
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
    readonly ClickOnAdd:Locator;
    readonly EnterNoOfCandidates:Locator;
    readonly ClickOnNextBtn:Locator;
    readonly VerifyExam_details:Locator;
    readonly VerifyChoose_Question:Locator;
    readonly VerifyChoose_Workflow:Locator;
    readonly VerifyChoose_Confirmation:Locator;
    readonly CliCKOnCreateSection:Locator;
    readonly ClickOnCreateExamSection:Locator;
    readonly ClickOnCreateSurveySection:Locator;
    readonly ClickOnAddSurveyQuestion:Locator;
    readonly EnterSectionName:Locator;
    readonly DescriptionMessage:Locator;
    readonly SelectTime:Locator;
    readonly ClickOnSave:Locator;
    readonly ClickOnAddQuestion:Locator;
    readonly ClickOnSearchQuestion:Locator;
    readonly ClickOnSelectAllCheckBox:Locator;
    readonly ClickOnAddBtn:Locator;
    readonly ClickOnSubmitAndApproveBtn:Locator;
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
    readonly SelectHighlighter:Locator;
    readonly Choosehrs:Locator;
    readonly ProctoringExam:Locator;
    readonly EnterInvigilatorPswd:Locator;
    readonly fectchExamID:Locator;
    readonly nextButton:Locator;
    readonly Oneclick:Locator;
    readonly MenuIconClick:Locator;
    readonly logoutbuttonClick:Locator;
    readonly PracticeExam:Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);

        this.AUTHOR = page.locator('//div[text()="iAuthor"]');
        this.EXAMSMENU = page.locator('//a[text()="Exams"]')
        this.CREATEEXAMS = page.locator('//button[normalize-space()="Create Exam"]')
        this.STARTFROMSCRATCH = page.locator('//p[normalize-space()="Start from Scratch"]')

        this.SELECTBANK = page.locator('//input[@placeholder="Select Bank"]');
        this.TESTBANK = page.locator('//span[contains(text(),"Elumina - Test Bank")]')
        this.EXAMNAME = page.locator('(//input[@name="inputbox"])[1]')
        this.EXAMCODE = page.locator('(//input[@name="inputbox"])[2]')
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
        this.ClickOnAdd=page.getByRole('button', { name: 'Add' });
        this.EnterNoOfCandidates=page.getByRole('spinbutton');
        this.ProctoringExam = page.locator('(//span[@class="slider round"])[2]');
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
        this.Choosehrs=page.locator('//body//app-root//select[1]');
        this.ClickOnSave=page.locator('//button[normalize-space()="Save"]');

        this.ClickOnCreateContentSection=page.getByText('Create Content Section');
        this.selectMinutes=page.getByRole('combobox').nth(1);
        this.ClickonCreateContentPage=page.locator('//i[@title="Create Content Page"]');
        this.ClickOnAddContent=page.locator('//div[@class="add_content"]');
        this.enterContentTitle=page.locator('//input[@name="inputbox"]');
        this.ClickOnContentLayout=page.locator('//input[@placeholder="Select Content Layout"]');
        this.ClickOnTermAndCondition=page.locator('//span[text()="Terms & Conditions"]');
        this.ClickOnCreateSurveySection=page.getByText('Create Survey Section');
        this.ClickOnAddSurveyQuestion=page.locator('//i[@title="Create Survey Question"]');
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
        this.SelectHighlighter=page.locator('(//div[@class="dropdown-main"])[6]//ul//li[3]//span[text()="Highlighter"]');
        this.fectchExamID=page.locator('//div[@class="label-text"]');
        this.nextButton=page.locator('//li[@class="next"]');
        this.Oneclick=page.locator('(//li//span[text()="1"])[1]');
        this.MenuIconClick=page.locator('//i[@class="menuIcons profileIcon"]');
        this.logoutbuttonClick=page.locator('//a[normalize-space()="Log out"]');
        this.PracticeExam = page.locator('(//span[@class="slider round"])[1]')

    }

    /**Method for Page Navigation */
    async iAuthorPageNavigation() {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            await this.AUTHOR.click()
          ]);
          await newPage.waitForLoadState();
          return new exports.EluminaExamPage(newPage);
    }

    /**Method for Exam Tab Navigation */
    async examTabNavigation(): Promise<void> {
      await this.EXAMSMENU.click();
    }

    /*Create a Exam*/
    async createCommonExam(): Promise<void> {

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
        

        await this.EXAMSMENU.click();
        await expect(this.CREATEEXAMS).toBeVisible();
        await this.CREATEEXAMS.click();
        await this.STARTFROMSCRATCH.click();
        await this.SELECTBANK.click();
        await this.TESTBANK.click();
        await this.EXAMNAME.type('DEMO'+Math.floor(Math.random()*899999+100000));
       
        await this.EXAMCODE.type('D'+Math.floor(Math.random()*89+100));
 
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
        await this.EnterNoOfCandidates.type('10');
        await this.ClickOnAdd.click();
    }

 /**Method to Create Common Exam */
 async createCommonProExam(): Promise<void> {

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

    async clickonNextBtnInExam(){
      await this.ClickOnNextBtn.click();
      await expect(this.VerifyExam_details).toBeVisible();
      await expect(this.VerifyChoose_Question).toBeVisible();
      await expect(this.VerifyChoose_Workflow).toBeVisible();
      await expect(this.VerifyChoose_Confirmation).toBeVisible();
      await this.page.waitForTimeout(5000);
    }

     /**Method to create exam */
     async createProctorExam(): Promise<void> {
      await this.createCommonProExam();
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

    /** Method to Create Content Section */
    async createContentSection():Promise<void>{
      await this.CliCKOnCreateSection.click();
      await this.ClickOnCreateContentSection.click();
      await this.EnterSectionName.type('Content-'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type('Hello World.....');
      await this.page.waitForTimeout(5000);
      await this.selectMinutes.selectOption('1');
      await this.ClickOnSave.click();
      
    }

    /**Method to Create a Content Section Page*/
    async createContentPage():Promise<void>{
      await this.ClickonCreateContentPage.click();
      await this.ClickOnAddContent.click();
      await this.enterContentTitle.type('Content-A'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type('Hello World.....');
      await this.page.waitForTimeout(5000);
      await this.ClickOnContentLayout.click();
      await this.ClickOnTermAndCondition.click();
      await this.ClickOnSave.click();

    }

     /**Method to add more description in content page */
    async createContentPageWithMoreDescription():Promise<void>{
      await this.ClickonCreateContentPage.click();
      await this.ClickOnAddContent.click();
      await this.enterContentTitle.type('Content-A'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type(makeid(5000));
      await this.page.waitForTimeout(5000);
      await this.ClickOnContentLayout.click();
      await this.ClickOnTermAndCondition.click();
      await this.ClickOnSave.click();

    }

    /**Create Exam Section */
    async createSection(): Promise<string>{
      EluminaExamPage.examID=await this.fectchExamID.textContent();
      console.log("Exam ID:"+EluminaExamPage.examID);
      await this.CliCKOnCreateSection.click();
      await this.ClickOnCreateExamSection.click();
      await this.EnterSectionName.type('Exam-'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type(testData.DescriptionMessage);
      await this.page.waitForTimeout(5000);
      await this.Choosehrs.selectOption('1');
      await this.SelectTime.selectOption('30');
      await this.ClickOnSave.click();
      await this.page.waitForTimeout(5000);
      return EluminaExamPage.examID;
    }

     //Create Survey Section
     async createSurveySection(){
      await this.page.waitForTimeout(5000);
      await this.CliCKOnCreateSection.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnCreateSurveySection.click();
      await this.EnterSectionName.type('Survey-'+Math.floor(Math.random())*89+10);
      await this.page.waitForTimeout(5000);
      await this.DescriptionMessage.click();
      await this.DescriptionMessage.type('Hello World.....');
      await this.page.waitForTimeout(5000);
      await this.selectMinutes.selectOption('10');
      await this.ClickOnSave.click();

    }
    async createSurveyPage():Promise<void>{
      await this.ClickOnAddSurveyQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('MCQ');
      await this.page.waitForTimeout(5000);
      await this.page.locator('(//input[@type="checkbox"])[2]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
      await this.ClickOnNextBtn.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnSubmitAndApproveBtn.click();
      await this.page.waitForTimeout(5000);
    }

    /*Add all Questions in an Exam*/
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

    /*Add MCQ Questions in an Exam*/
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

    /**Method for Logout */
    async logoutClick(){
      await this.MenuIconClick.click();
      await this.logoutbuttonClick.click();
    
    }

    async addVSAQQuestions():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('VSAQ');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[3]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
      await this.ClickOnNextBtn.click();
      await this.page.waitForTimeout(5000);
      await this.ClickOnSubmitAndApproveBtn.click();   
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

  async addVSAQQuestion():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('VSAQ');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[2]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
  }

  async addISAWEQuestion():Promise<void>{
      await this.ClickOnAddQuestion.click();
      await this.ClickOnSearchQuestion.click()
      await this.ClickOnSearchQuestion.type('ISAWE');
      await this.page.waitForTimeout(3000);
      await this.page.locator('(//input[@type="checkbox"])[2]').click();
      await this.ClickOnAddBtn.click()
      await this.ClickOnSave.click();
  }

  async addTypeXQuestion():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('Type X');
    await this.page.waitForTimeout(3000);
    await this.page.locator('(//input[@type="checkbox"])[2]').click();
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();
  }

  async addTypeBQuestion():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('Type B');
    await this.page.waitForTimeout(3000);
    await this.page.locator('(//input[@type="checkbox"])[2]').click();
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();
  }

  async addSAQQuestion():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('SAQ');
    await this.page.waitForTimeout(3000);
    await this.page.locator('(//input[@type="checkbox"])[2]').click();
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();

  }

  async addSJTQuestion():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('SJT');
    await this.page.waitForTimeout(3000);
    await this.page.locator('(//input[@type="checkbox"])[2]').click();
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();
    await this.ClickOnNextBtn.click();
    await this.page.waitForTimeout(5000);
    await this.ClickOnSubmitAndApproveBtn.click();


  }
   
  /*Create a Exam with Inv password*/
     async createExamWithNotepad(): Promise<void> {
      await this.createCommonExam();
      await this.EnterInvigilatorPswd.click();
      await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
      await this.page.waitForTimeout(5000);
     
  }

  /*Create a Exam with select Note pad*/
  async selectNotepadTool(){
    await this.ExamTools.click();
    await this.SelectNotepad.click();
    //await this.ClickOnNextBtn.click();
    await expect(this.VerifyExam_details).toBeVisible();
    await expect(this.VerifyChoose_Question).toBeVisible();
    await expect(this.VerifyChoose_Workflow).toBeVisible();
    await expect(this.VerifyChoose_Confirmation).toBeVisible();
    await this.page.waitForTimeout(5000);
  }


     /*Create a Exam with All Tools*/
  async selectAllTools(){
   await this.ExamTools.click();
  await this.SelectCalculator.click();
  await this.SelectNotepad.click();
  await this.SelectHighlighter.click();
  await this.ClickOnNextBtn.click();
  await expect(this.VerifyExam_details).toBeVisible();
  await expect(this.VerifyChoose_Question).toBeVisible();
  await expect(this.VerifyChoose_Workflow).toBeVisible();
  await expect(this.VerifyChoose_Confirmation).toBeVisible();
  await this.page.waitForTimeout(5000);
  }

     /*Create a Exam with select Highlighter*/
     async selctHighlighterTool(){
      await this.ExamTools.click();
      await this.SelectHighlighter.click();
      await this.ClickOnNextBtn.click();
      await expect(this.VerifyExam_details).toBeVisible();
      await expect(this.VerifyChoose_Question).toBeVisible();
      await expect(this.VerifyChoose_Workflow).toBeVisible();
      await expect(this.VerifyChoose_Confirmation).toBeVisible();
      await this.page.waitForTimeout(5000);
     }

  /**Method to Add SAQ Questions */
  async addSAQQuestions():Promise<void>{
    await this.ClickOnAddQuestion.click();
    await this.ClickOnSearchQuestion.click()
    await this.ClickOnSearchQuestion.type('SAQ');
    await this.page.waitForTimeout(5000);
    await this.page.waitForSelector('//div[@class="eqc-question-info"]//input',{timeout:10000});
    const SAQQuestions=await this.page.$$('//div[@class="eqc-question-info"]//input');
    for(let i=0;i<=SAQQuestions.length-3;i++)
    {
      await SAQQuestions[i].click();
    }
    await this.ClickOnAddBtn.click()
    await this.ClickOnSave.click();
    await this.ClickOnNextBtn.click();
    await this.page.waitForTimeout(5000);
    await this.ClickOnSubmitAndApproveBtn.click();
    await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    await this.page.waitForTimeout(5000);

  }

  /**Method to Create Multiple Candidates */
  async createExamforMultipleCandidates(): Promise<void> {
    await this.createCommonExam();
    await this.EnterInvigilatorPswd.click();
    await this.EnterInvigilatorPswd.type(testData.EnterInvigilatorPassword);
    await this.page.waitForTimeout(5000);
    await expect(this.VerifyExam_details).toBeVisible();
    await expect(this.VerifyChoose_Question).toBeVisible();
    await expect(this.VerifyChoose_Workflow).toBeVisible();
    await expect(this.VerifyChoose_Confirmation).toBeVisible();
    await this.page.waitForTimeout(5000);
  }


//**Methods to create exam with calculator */
async createExamWithCalculator(): Promise<void> {
  await this.createCommonExam();
  await this.ExamTools.click();
  await this.SelectCalculator.click();

  await this.ClickOnNextBtn.click();
  await expect(this.VerifyExam_details).toBeVisible();
  await expect(this.VerifyChoose_Question).toBeVisible();
  await expect(this.VerifyChoose_Workflow).toBeVisible();
  await expect(this.VerifyChoose_Confirmation).toBeVisible();
  await this.page.waitForTimeout(5000);
}

/**Methods to create exam with highlighter */
async createExamWithHighlighter(): Promise<void> {
  await this.createCommonExam();
  await this.ExamTools.click();
  await this.SelectHighlighter.click();

  await this.ClickOnNextBtn.click();
  await expect(this.VerifyExam_details).toBeVisible();
  await expect(this.VerifyChoose_Question).toBeVisible();
  await expect(this.VerifyChoose_Workflow).toBeVisible();
  await expect(this.VerifyChoose_Confirmation).toBeVisible();
  await this.page.waitForTimeout(5000);
}


    
}