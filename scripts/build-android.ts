import {$, execa} from 'execa';
import path from 'path';
import dotenv from 'dotenv';

import appConfig from '../src/manifest.json';

const root = path.join(process.cwd(), './');
const androidRoot = path.join(process.cwd(), './android');

function getEnvByPath(path: string) {
    let dotEnvs = {};
    const dotEnvsConfig = dotenv.config({path});

    if (!dotEnvsConfig.error) {
        Object.keys(dotEnvsConfig.parsed).forEach(key => {
            dotEnvs[key] = dotEnvsConfig.parsed[key]
        });
    }

    return dotEnvs;
}

async function buildAppPlusByCmd() {
    const subprocess = $`npm run build:app-plus`;

    // 捕获并打印子进程的标准输出
    subprocess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    await subprocess;
    console.log('build:app-plus run success');
}

async function copyAppPlus() {
    const {appid} = appConfig;
    await $`rm -rf ./android/app/src/main/assets/apps/${appid}`;
    await $`mkdir ./android/app/src/main/assets/apps/${appid}`;
    await $`mkdir ./android/app/src/main/assets/apps/${appid}/www`;
    await $`cp -r ./dist/build/app/ ./android/app/src/main/assets/apps/${appid}/www/`
}

async function buildAndroid() {
    const {ENV_NAME} = (process.env.ENV ? getEnvByPath(process.env.ENV) : {}) as Record<any, any>;

    process.chdir(androidRoot);
    const result = execa('./gradlew', ['assembleRelease', '-P', `ENV_NAME=${ENV_NAME ?? 'debuge'}`]);
    result.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    await result;
    process.chdir(root);
    console.log(`${androidRoot}/app/build/outputs`);
}

(async () => {
    await buildAppPlusByCmd();
    await copyAppPlus();
    await buildAndroid();
})()
