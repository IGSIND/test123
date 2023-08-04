import test from '@lib/BaseTest';

/**Validation of Entering an exam from the invigilator dashboard to invigilate */
    test(`@Smoke Verify Entering an exam from the invigilator dashboard to invigilate`, async ({ eluminaInvPage, webActions }) => {
        await test.step('Invigilator logging into application', async () => {
            await eluminaInvPage.invigilatorLogin();
        });

        await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
            const newtab = await eluminaInvPage.iAuthorPageNavigation();
            await newtab.invClickOnExam();  
            await newtab.logoutClick();
        });   
     });
