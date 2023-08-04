import test from '@lib/BaseTest';

//Validation of login for invigilator for Invalid credential

test(`@Regression Verify Validation of login for invigilator for Invalid credential`, async ({ eluminaInvPage, webActions }) => {
   
    await test.step(`Inv Login to Elumina application`, async () => {
        await eluminaInvPage.invalidInvigilatorLogin();
    });
    
   
});