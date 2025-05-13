import type { ScreenParams, ScreenPathKeyType } from '@/route.const'
import { omit } from 'lodash'

type NavigateToParams = Parameters<typeof uni.navigateTo>[0]
type ReLaunchParams = Parameters<typeof uni.reLaunch>[0]
type SwitchTabParams = Parameters<typeof uni.switchTab>[0]
type RedirectToParams = Parameters<typeof uni.redirectTo>[0]
type NavigatePushParams<U extends keyof ScreenPathKeyType> = { url: U, query?: ScreenParams<ScreenPathKeyType[U]> } & NavigateToParams

interface RouteInfo {
  path: string
  query: Record<string, string>
}

export class Navigate {
  public static getRoute(): RouteInfo {
    const pages = getCurrentPages()
    const currentPage = pages.reverse()[0]
    if (!currentPage)
      return { path: '', query: {} }

    return {
      path: currentPage.route!,
      query: (currentPage as any).options,
    }
  }

  public static push<U extends keyof ScreenPathKeyType>(params: NavigatePushParams<U>) {
    if ('url' in params && 'query' in params) {
      const { url, query } = params
      const queryValues = query
        ? Object.entries(query)
            .filter(([_, value]) => value !== undefined)
        : []

      let queryString = ''
      if (queryValues.length) {
        queryString = `?${queryValues.map(([key, value]) => `${key}=${String(value)}`).join('&')}`
      }

      uni.navigateTo({
        ...omit(params, ['url']),
        url: url + queryString,
      })
    }
    else {
      uni.navigateTo({
        ...params as NavigateToParams,
      })
    }
  }

  /**
   * 路由退栈
   * @param delta 可选参数，表示返回的页面层级，默认返回上一级
   */
  public static back(delta: number = 1) {
    uni.navigateBack({ delta })
  }

  /**
   * 重启App
   * @param params
   */
  public static reLaunch(params: ReLaunchParams) {
    uni.reLaunch(params)
  }

  /**
   * 替换当前路由
   * @param params
   */
  public static redirect(params: RedirectToParams) {
    uni.redirectTo(params)
  }

  /**
   * 切换TabBar页面
   * @param params
   */
  public static switchTab(params: SwitchTabParams) {
    uni.switchTab(params)
  }
}
