import test from '@lib/BaseTest';

//Validation of the "Timer" - After clicking on "Start Exam" Button

test(`@Regression Verify Validation of the "Timer" - After clicking on "Start Exam" Button`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.verifyExamDashboardTimer();
    });
});