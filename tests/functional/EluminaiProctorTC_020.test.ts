import test from '@lib/BaseTest';

//Elumina Login as an invigilator - Validation of UN, PWD & the URL (Proctor)

test(`@Smoke Verify Elumina Login as an invigilator - Validation of UN, PWD & the URL Proctor`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invigilatorLogin();
    });
    
    await test.step(`Navigate to exam Tab and Create New Exam`, async () => {
        const newtab = await eluminaInvPage.iAuthorPageNavigation();
        await newtab.iAuthorPageVerification();
        await newtab.logoutClick();
        
        
    });
});