import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed are Gray by Default*/

test(`@Regression Validate the Exam sheet where the Question numbers are displayed are Gray by Default`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.NotAnsweringQuestions();
    });
    
});
