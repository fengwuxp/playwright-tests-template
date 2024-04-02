import * as process from "process";
import fs from "fs-extra"

const env = process.env['NODE_ENV']
console.log("active env", env);

export interface TestConfig {
    /**
     * Api 测试接口签名秘钥 private key
     */
    rsaPrivateKey: string;

    /**
     * 测试用户名密码
     */
    testUser: {
        userName: string;
        password: string;
    },

    /**
     * api base url
     */
    apiBaseUrl: string;

    /**
     * 视图 base url
     */
    viewBaseUrl: string;
}

// 按照环境读取配置
const config: TestConfig = fs.readJsonSync(`${process.cwd()}/src/config/${env}.json`);
export default config;