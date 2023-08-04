import test from '@lib/BaseTest';

//Validation of Invigilator Dashboard after the Exam Completion by candidate (once the time exceeds)

test(`@Regression Validation of "Time Remaining" pop-up when the just before the exam time runs out`, async ({ eluminaLoginPage, eluminaMinimalTimeExamPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
        await eluminaLoginPage.verifyProfilePage();
    });
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaMinimalTimeExamPage.iAuthorPageNavigation();
        await newtab.examTabNavigation();
        await newtab.createExam();
        await newtab.createSection();
        await newtab.addMCQQuestions();
    });
});

test(`@Regression Verify Elumina RegistrationInv and add User and Invigilator`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaLoginPage.navigateToURL();
    });
    await test.step(`Login to Elumina application`, async () => {
        await eluminaLoginPage.loginToApplication();
    });
    await test.step(`Navigate to exam Tab and Create New user`, async () => {
        const newtab = await eluminaRegPage.iAuthorPageNavigations();
        await newtab.registrationTabNavigationforMinimaltime();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
        await newtab.addExistingUsers();
    });
});    

test(`@Regression Validation of Invigilator Dashboard after the Exam Completion by candidate (once the time exceeds)`, async ({ eluminaCandPage, webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.waitforTime3();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.examSectionValidation();
        await eluminaCandPage.waitforTime();
        await eluminaCandPage.clickOnAutoSubmitOKPopup();
    
    });
});     

test(`@Regression Verify Validation of Invigilator Dashboard `, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
        
        
    });
});
