import test from '@lib/BaseTest';

/**Validation of login for invigilator for valid credential */

test(`@Regression Validation of login for invigilator for valid credential`, async ({ eluminaInvPage,webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
    });
});