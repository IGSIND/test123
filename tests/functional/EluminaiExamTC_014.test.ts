import test from '@lib/BaseTest';

//Validation of Invigilator Dashboard

test(`@Smoke Verify Validation of Invigilator Dashboard`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.invDashboardValidations();
        await newtab.logoutClick();
    });
});