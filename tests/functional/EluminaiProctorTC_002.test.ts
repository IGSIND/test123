import test from '@lib/BaseTest';
import { chromium } from '@playwright/test';

//Validation of Candidate App URL, Login Page 

test(`@Smoke Verify CandidatesInvExam`, async ({ eluminaCadInvPage,webActions }) => {
    await test.step(`Navigate to Application`, async () => {
        await eluminaCadInvPage.candidateNavigateToURL();
    });

    await test.step(`Candidate Login to application`, async () => {
        await eluminaCadInvPage.candidateLoginToApplicationsByEnteringUsername();
        await eluminaCadInvPage.logoutClick();
    });
});