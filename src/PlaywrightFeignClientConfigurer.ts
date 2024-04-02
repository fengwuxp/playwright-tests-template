import {FeignClientConfiguration, FeignClientConfigurer} from "feign-client";
import {
    ApiSignatureRequestInterceptor,
    DefaultHttpClient,
    HttpMediaType,
    RestTemplate,
    RoutingClientHttpRequestInterceptor,
    TraceClientHttpRequestInterceptor
} from "wind-http";
import {ApiRequestSinger} from "wind-api-signature";
import {PlaywrightHttpAdapter} from "wind-http-playwright";
import {APIRequestContext} from "@playwright/test";
import config from "./config/";


export default class PlaywrightFeignClientConfigurer implements FeignClientConfigurer {

    private readonly httpAdapter: PlaywrightHttpAdapter;

    constructor(request: APIRequestContext) {
        this.httpAdapter = new PlaywrightHttpAdapter(request);
    }

    build = (): FeignClientConfiguration => {
        const singer = ApiRequestSinger.sha256WithRsa({
            accessId: "example",
            secretKey: config.rsaPrivateKey
        }, {headerPrefix: "Wind", debug: true});
        const httpClient = new DefaultHttpClient(this.httpAdapter, [
            new TraceClientHttpRequestInterceptor(),
            // TODO 替换域名
            new RoutingClientHttpRequestInterceptor(config.viewBaseUrl),
            new ApiSignatureRequestInterceptor(singer)
        ], HttpMediaType.APPLICATION_JSON);
        return {
            restTemplate: new RestTemplate(httpClient)
        }
    }
}