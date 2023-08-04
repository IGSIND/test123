import test from '@lib/BaseTest';

/**Password will not be asked after clicking on "Start Exam"*/

test(`@Regression Password will not be asked after clicking on "Start Exam"`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with inactive user`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQwithoutReviewe();
    });
    
});