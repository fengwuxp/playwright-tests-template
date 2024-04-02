import {expect, test} from '@playwright/test';
import PlaywrightFeignClientConfigurer from "../src/PlaywrightFeignClientConfigurer";
import {FeignConfigurationRegistry,} from "feign-client";
import {DEFAULT_SERVICE_NAME} from "wind-http";
import {queryExamples} from "../src/api/clients/ExampleService";


test.beforeEach(async ({request}) => {
    // 初始化 API SDK
    const configuration = new PlaywrightFeignClientConfigurer(request).build();
    FeignConfigurationRegistry.setFeignConfiguration("http", DEFAULT_SERVICE_NAME, configuration);
});

test.describe('Api test', () => {
    test('api test example 1', async ({page}) => {
        const result = await queryExamples();
        expect(result.success).toEqual(true);
        expect(result.data).toEqual("example");
    });
})

