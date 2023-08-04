import test from '@lib/BaseTest';

/**Validate the Exam sheet where the Question numbers are displayed in Orange when In Progress*/

test(`@Regression Validate the Exam sheet where the Question numbers are displayed in Orange when In Progress`, async ({ eluminaCandPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCandPage.candidateNavigateToURL();
    });
    await test.step(`Candidate Login to application`, async () => {
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
        await eluminaCandPage.InProgressQuestions();
    });
    
});
