import test from '@lib/BaseTest';

//Validation of Browser back button after Exam Starts

// test(`@Regression Verify Elumina Login and Create Exam and add MCQ`, async ({ eluminaLoginPage, eluminaHomePage, eluminaExamPage, webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
//         const newtab = await eluminaExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createCommonExam();
//         await newtab.clickonNextBtnInExam();
//         await newtab.createSection();
//         await newtab.addMCQQuestions();
//     });
// });    

// test(`@Regression add user in Registration and download User details and assign Invigilator`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Navigate to exam Tab and Create New user`, async () => {
//         const newtab = await eluminaRegPage.iAuthorPageNavigations();
//         await newtab.registrationTabNavigation();
//         await newtab.addUserDetails();
//         await newtab.downloadUserDetails();
       
//     });
// });

test(`@Regression Verify Validation of Browser back button after Exam Starts`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.verifyExamDashboardTimer();
        await eluminaCandPage.navigateBack();
    });
    
    
});