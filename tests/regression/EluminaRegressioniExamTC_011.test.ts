import test from '@lib/BaseTest';

/**Validation of Candidate Start Exam without Invigilator Password*/

test(`@Regression Validation of Candidate Start Exam without Invigilator Password`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application with and start exam`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
        await eluminaCandPage.candidateStartMCQwithoutReviewe();
    });
    
});