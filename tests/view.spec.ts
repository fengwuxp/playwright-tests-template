import {expect, test} from '@playwright/test';
import HttpMonitor, {PlaywrightHttpiResponse} from "../src/http/HttpMonitor";
import {HttpMethod} from "wind-http";
import {ApiResponse, Pagination} from "feign-client";

const HTTP_MONITOR: { ref: HttpMonitor } = {ref: null};
test.beforeEach(async ({page}) => {
    HTTP_MONITOR.ref = HttpMonitor.of(page);
    await HTTP_MONITOR.ref.start()
});

test.afterEach(async () => {
    await HTTP_MONITOR.ref.destroy();
})

test.describe('UI test', () => {
    test('UI test example 1', async ({page}) => {
        const {ref: httpMonitor} = HTTP_MONITOR;
        const responseEvent: PlaywrightHttpiResponse<ApiResponse<Pagination<any>>> = httpMonitor.wait2xxResponse("/api/v1/example", HttpMethod.GET)
        await page.goto("/examples");
        const response = await responseEvent
        expect(response.body.success).toEqual(true)
    });

})

