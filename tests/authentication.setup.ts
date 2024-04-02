import {expect, test as setup} from '@playwright/test';
import {STORAGE_STATE_FILEPATH} from "../playwright-constants";
import config from "../src/config";


/**
 * 统一登录处理
 * 参见：https://playwright.dev/docs/auth
 */
setup('authenticate', async ({page}) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('login');
    await page.getByPlaceholder('用户名').fill(config.testUser.userName);
    await page.getByPlaceholder('密码').fill(config.testUser.password);
    await page.getByText('登 录').click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByText('登录成功！')).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({path: STORAGE_STATE_FILEPATH});
})
;