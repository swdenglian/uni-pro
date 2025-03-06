# NavBar 导航栏组件文档

## 组件概述

用于页面顶部导航栏展示，支持以下特性：

- 返回箭头导航功能
- 透明背景模式切换
- 主标题文字显示
- 自动适配小程序顶部安全区域

## 安装与引入

```ts
import {NavBar} from '@/components/NavBar/NavBar.vue'
```

## 基本用法

```vue

<template>
  <!-- 默认配置 -->
  <NavBar text="页面标题"/>

  <!-- 禁用返回箭头 -->
  <NavBar text="无返回按钮" useLeftArrow(false)/>

  <!-- 透明模式 -->
  <NavBar text="透明导航栏" transparent/>
</template>
```

## Props 配置

| 参数           | 类型      | 默认值       | 说明         |
|--------------|---------|-----------|------------|
| useLeftArrow | boolean | true      | 是否显示返回箭头   |
| transparent  | boolean | false     | 是否启用透明背景模式 |
| text         | string  | undefined | 导航栏主标题文字   |

## 事件

| 事件名称 | 类型    | 说明        |
|------|-------|-----------|
| back | Event | 点击返回箭头时触发 |

## 样式指南

### 类名说明

- `.navBarWarp`：外层容器
- `.transparent`：透明模式专用类
- `.arrow`：返回箭头图片容器

### 自定义建议

1. 通过 `:class="{ transparent }"` 动态控制透明状态
2. 可通过 CSS 覆盖默认样式（如修改`.text`字体颜色）
3. 推荐使用 `rpx` 单位适配不同设备

## 注意事项

1. 依赖组件：
    - `@/shared/Navigate`：导航服务
    - `../SafeArea/SafeArea.vue`：安全区域适配组件
2. 透明模式下：
    - 需配合小程序的 `uni.setNavigationBarColor` API 使用
    - 文字颜色会根据透明度自动切换为白/黑
3. 高度规范：
    - 固定高度 `90rpx`
    - 包含顶部安全区域补偿空间
4. 返回箭头：
    - 默认使用本地图片资源
    - 需自行维护图片路径 (`/static/components/NavBar/`)