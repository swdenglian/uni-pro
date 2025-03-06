# Page 组件文档

`<Page>` 是一个基础页面容器组件，提供顶部导航栏、底部标签栏和沉浸式布局能力，适用于多页面场景的统一布局管理。

## 基本特性

• 支持顶部导航栏显示/隐藏
• 支持底部标签栏显示/隐藏
• 支持沉浸式滚动效果
• 支持自定义页面背景
• 自动处理导航栏高度占位

## Props

| 属性名                 | 类型            | 默认值     | 说明                                                      |
|---------------------|---------------|---------|---------------------------------------------------------|
| useNavBar           | `boolean`     | `true`  | 是否显示顶部导航栏                                               |
| useTabBar           | `boolean`     | `false` | 是否显示底部标签栏（需要配合 AppTabBar 组件使用）                          |
| navConfig           | `NavBarProps` | -       | 导航栏配置，详见 [NavBar 组件文档](../NavBar/README.md)             |
| immersive           | `boolean`     | `false` | 是否启用沉浸式模式（滚动时导航栏渐变效果）                                   |
| immersiveNavBgColor | `string`      | -       | 沉浸式模式导航栏背景色（支持 CSS 颜色值，如 `#ffffff` 或 `rgba(0,0,0,0.5)`） |

## 插槽

### 默认插槽

用于放置页面主要内容

```vue

<Page>
  <view>页面内容</view>
</Page>
```

### background 插槽

用于自定义页面背景（覆盖默认灰色背景）

```vue

<Page>
  <template #background="{ navHeight }">
    <image
        src="/bg.jpg"
        :style="{ height: `calc(100vh - ${navHeight}px)` }"
    />
  </template>
</Page>
```

## 样式说明

### 布局结构

```html

<view class="page">
    <!-- 背景层 -->
    <view class="pageBackground"/>

    <!-- 内容层 -->
    <view class="main">
        <!-- 导航栏区域 -->
        <view class="nav-bar">
            <view class="nav-bar-bg"/> <!-- 沉浸式背景层 -->
            <NavBar/>
        </view>

        <!-- 内容区域 -->
        <scroll-view class="content"/>

        <!-- 底部标签栏 -->
        <AppTabBar/>
    </view>
</view>
```

### 关键样式类

• `.immersive` - 沉浸式模式样式
• `.nav-bar-bg` - 沉浸式导航栏背景层
• `.content` - 内容滚动区域

## 使用示例

### 基础用法

```vue

<Page
    use-nav-bar
    use-tab-bar
    :nav-config="{ title: '首页' }"
>
  <view class="content-box">页面内容</view>
</Page>
```

### 沉浸式模式

```vue

<Page
    immersive
    immersive-nav-bg-color="rgba(255,255,255,0.8)"
>
  <template #background>
    <image src="/scenic-bg.jpg" mode="aspectFill"/>
  </template>

  <view v-for="i in 50" :key="i">滚动内容 {{ i }}</view>
</Page>
```

### 自定义背景

```vue

<Page>
  <template #background="{ navHeight }">
    <view
        class="gradient-bg"
        :style="{ paddingTop: navHeight + 'px' }"
    />
  </template>

  <view>带渐变背景的内容</view>
</Page>

<style>
  .gradient-bg {
    background: linear-gradient(180deg, #83a4d4, #b6fbff);
  }
</style>
```

## 注意事项

1. **沉浸式模式要求**  
   启用 `immersive` 时必须使用组件内部的 `scroll-view` 滚动容器，请勿在外层自行添加滚动容器

2. **导航栏高度**  
   导航栏高度通过 `PageConst.NavHeight` 常量获取（默认值通常为44px），实际开发中应根据不同平台调整

3. **层级关系**  
   • 背景层 (`pageBackground`) z-index: 1
   • 内容层 (`main`) z-index: 2
   • 沉浸式导航栏 z-index: 999

4. **性能优化**  
   长列表建议在内容插槽中使用 [虚拟列表组件](https://uniapp.dcloud.net.cn/component/uni-ui/uni-list.html) 优化性能