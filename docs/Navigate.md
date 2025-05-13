# Navigate 路由导航

`Navigate` 类封装了 uni-app 的路由跳转功能，提供类型安全的页面导航、路由管理和事件通信能力。

## 何时使用

- 需要在应用内进行页面跳转时
- 需要获取当前页面路由信息时
- 需要在页面间传递参数时
- 需要进行路由事件监听时

## 代码演示

### 基础用法

最基本的页面跳转方式。

```typescript
// 跳转到详情页
Navigate.push({
  url: Screens.ComponentsPagination,
})

// 返回上一页
Navigate.back()
```

### 带参数跳转

通过 query 对象传递类型安全的参数。

```typescript
Navigate.push({
  url: Screens.ComponentsPagination,
  query: {
    id: '123',
    type: 'test'
  }
})
```

### 获取路由信息

使用 `useRoute` Hook 获取当前页面的路由信息。

```typescript
const { route, waitLoad } = useRoute()

// 等待页面加载完成
await waitLoad()

console.log(route.value.query) // 获取路由参数
console.log(route.value.path) // 获取路由路径
```
## API

### Navigate 静态方法

| 方法名 | 说明 | 参数类型 | 返回值 |
| --- | --- | --- | --- |
| push | 保留当前页面，跳转到应用内的某个页面 | `NavigatePushParams<U>` | void |
| back | 关闭当前页面，返回上一页面或多级页面 | `delta?: number` | void |
| reLaunch | 关闭所有页面，打开到应用内的某个页面 | `ReLaunchParams` | void |
| redirect | 关闭当前页面，跳转到应用内的某个页面 | `RedirectToParams` | void |
| switchTab | 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面 | `SwitchTabParams` | void |
| getRoute | 获取当前页面路由信息 | - | `RouteInfo` |

### NavigatePushParams

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 需要跳转的应用内页面路径 | `keyof ScreenPathKeyType` | - |
| query | 路由参数，类型安全 | `ScreenParams<ScreenPathKeyType[U]>` | - |
| events | 页面间通信接口 | `object` | - |

### RouteInfo

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| path | 当前页面路径 | `string` |
| query | 路由参数 | `Record<string, string>` |

### useRoute Hook

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| load | 页面加载完成时的回调函数 | `() => void` | - |

返回值：

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| route | 当前页面路由信息 | `Ref<RouteInfo<RouteParams<U>>>` |
| waitLoad | 等待页面加载完成的 Promise | `() => Promise<void>` |
