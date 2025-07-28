interface ScreenConfig<TPath = string, TParams = undefined> {
  path: TPath
  params: TParams
}

function defineScreenConfig<TPath = string, TParams = undefined>(params: ScreenConfig<TPath, TParams>) {
  return params
}

export const ScreenConfigs = {
  Home: defineScreenConfig({
    path: '/ui/pages/home/index',
    params: undefined,
  }),
  HomeComponents: defineScreenConfig({
    path: '/ui/pages/home-components/index',
    params: undefined,
  }),
  HomeMine: defineScreenConfig({
    path: '/ui/pages/home-mine/index',
    params: undefined,
  }),

  /** 组件 */
  ComponentsPagination: defineScreenConfig({
    path: '/ui/pages/components/pagination/index',
    params: undefined,
  }),

  /** 依赖注入示例 */
  DIExample: defineScreenConfig({
    path: '/ui/pages/di-example/index',
    params: undefined,
  }),
}

// 导出 ScreenConfigs 的类型
export type ScreenConfigType = typeof ScreenConfigs

// 从 ScreenConfigs 中提取路由名称类型
export type ScreenName = keyof ScreenConfigType

// 从 ScreenConfigs 中提取路由参数类型
export type ScreenParams<T extends ScreenName> = ScreenConfigType[T]['params']

// 动态计算 Screens 对象
export const Screens = Object.fromEntries(
  Object.entries(ScreenConfigs).map(([key, value]) => [key, value.path]),
) as {
  [K in keyof ScreenConfigType]: typeof ScreenConfigs[K]['path']
}

type PathValue<T, P> = {
  [K in keyof T]: { path: P, params: any } extends T[K] ? K : never
}[keyof T]

export const ScreenPathKey = Object.fromEntries(
  Object.entries(ScreenConfigs).map(([key, value]) => [value.path, key]),
) as {
  [K in ScreenConfigType[ScreenName]['path']]: PathValue<ScreenConfigType, K>
}

export type ScreenPathKeyType = typeof ScreenPathKey
