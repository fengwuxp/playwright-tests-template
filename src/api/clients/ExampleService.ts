/* tslint:disable */
/* eslint-disable */
import {ApiResponse, FeignHttpClientPromiseFunction, feignHttpFunctionBuilder} from "feign-client";
import {UserQuery} from "../model/UserQuery";

/**
 * 接口：GET
 * Example
 **/
const API_FUNCTION_FACTORY = feignHttpFunctionBuilder({
    value: "/api/v1/examples",
});
/**
 * 1:Http请求方法：GET
 * 2:返回值在java中的类型为：ApiResp
 * 3:返回值在java中的类型为：String
 **/
export const queryExamples: FeignHttpClientPromiseFunction<UserQuery | void, ApiResponse<string>> = API_FUNCTION_FACTORY.get({});
