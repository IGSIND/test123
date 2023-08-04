import test from '@lib/BaseTest';

/**Validation of Exam content page - Scroll bar*/

test(`@Regression Verify Validation of Exam content page - Scroll bar`, async ({ eluminaCandPage,eluminaProctorCand,webActions }) => {
    await test.step('Candidate logging into application', async () => {
        await eluminaProctorCand.candidateNavigateToURL();
        await eluminaCandPage.candidateLoginToApplication();
    });
    await test.step('Candidate start the exam',async ()=> {
       await eluminaCandPage.candidateContentSectionValidation();
       await eluminaCandPage.HorizontalScrollAction();
       
    });
});