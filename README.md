# 命令说明

```json
{
  "scripts": {
    // 构建不同环境的Android包，构建结果在android/app/build/outputs/apk/release/ 下
    "build:android:prod": "cross-env ENV=.env.prod vite-node ./scripts/build-android.ts",
    "build:android:dev": "cross-env ENV=.env.dev vite-node ./scripts/build-android.ts",
    "build:android:test": "cross-env ENV=.env.test vite-node ./scripts/build-android.ts"
  }
}
```

# src/manifest.json 说明

```json5
{
  "name": "uni-app-demo", // 项目名称
  "appName": "uni-Android离线样例", // android app 中文名称用于显示在桌面上
  "appid": "__UNI__16FC452", // uni-app 的 appid
  "description": "用于uni-app脚手架,支持android构建", // 项目描述
  "versionName": "1.0.0",
  "versionCode": 1, 
  "transformPx": false,
  "android": {
    "dcloudAppKey": "05ccb5d7963e42b6872ae9de2e675bd2", // 必填, 可在开发者后台查看 https://dev.dcloud.net.cn/, 应用管理-->我的应用-->应用信息-->各平台信息-->Android App-->查看离线key
    "applicationId": "com.wwxan.uniapp.demo", // Android App 包名
    "signingConfigs": { // android 签名信息
      "storeFile": "android.keystore", // 签名文件路径
      "keyPassword": "skzi44SU", // 签名文件密码
      "storePassword": "skzi44SU" // 签名文件密码
    }
  },
}
```