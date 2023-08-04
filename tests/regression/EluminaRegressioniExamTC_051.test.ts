import test from '@lib/BaseTest';

/**Validation of Candidate Exam section - exam name, candidate name, exam timer and no of questions in the exam as per exam settings.*/

// test(`@Regression  Verify Elumina Login and create exam `, async ({ eluminaLoginPage,eluminaCandPage,eluminaExamPage,webActions }) => {
//     await test.step(`Navigate to Application`, async () => {
//         await eluminaLoginPage.navigateToURL();
//     });
//     await test.step(`Login to Elumina application`, async () => {
//         await eluminaLoginPage.loginToApplication();
//     });
//     await test.step(`Verify User is logged in and navigated to Elumina Homepage`, async () => {
//         await eluminaLoginPage.verifyProfilePage();
//     });
//     await test.step(`Navigate to exam Tab and Create New Exam and add MCQ Questions`, async () => {
//         const newtab = await eluminaExamPage.iAuthorPageNavigation();
//         await newtab.examTabNavigation();
//         await newtab.createCommonExam();
//         await newtab.clickonNextBtnInExam();
//         await newtab.createSection();
//         await newtab.addMCQQuestions();
//     });
// });


// test(`@Regression Verify Elumina Registration`, async ({ eluminaLoginPage,eluminaRegPage,webActions }) => {
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

/*test(`@Regression Verify Validation of the following in the Exam Section
Exam name, Candidate name, Exam timer, no of questions as per exam created`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.examSectionValidation();
    });
    
});    */