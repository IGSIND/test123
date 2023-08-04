import test from '@lib/BaseTest';

/**Validate Candidate while attending exam - Candidate abruptly closed the browser */

/*test(`@Regression Verify Elumina Login and Create Exam`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
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
        const newtab = await eluminaExamPage.iAuthorPageNavigation();
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
        await newtab.registrationTabNavigation();
        await newtab.addUserDetails();
        await newtab.downloadUserDetails();
    });
});            */

test(`@Regression Verify Validation of abrupt closure of browser`, async ({ eluminaCandPage,webActions }) => {

    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate starts and closes the page after attending two questions in the exam',async ()=> {
        await eluminaCandPage.candidateStartTwoMCQ();        
    });
});   


test(`@Regression Verify Candidate is able to close the broswer and answered questions are saved after logging in again`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQwithoutReviewe();
        console.log("Candidate is able to close the broswer and answered questions are saved after logging in again")

    });
});
