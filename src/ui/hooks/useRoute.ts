import type { ScreenConfigType, ScreenPathKeyType } from '@/route.const'
import type { Ref } from 'vue'
import { Navigate } from '@/shared/Navigate'
import { onLoad } from '@dcloudio/uni-app'
import { nextTick, ref } from 'vue'

interface RouteInfo<T> {
  fullPath: string
  path: string
  query: T
}

type RouteParams<U extends keyof ScreenPathKeyType> = ScreenConfigType[ScreenPathKeyType[U]]['params']

/**
 * 获取当前页面路由信息的Hook，支持响应式和泛型类型
 * @returns Ref<RouteInfo<T>> 当前页面的路由信息
 */
export function useRoute<U extends keyof ScreenPathKeyType>(load?: () => void): { route: Ref<RouteInfo<RouteParams<U>>>, waitLoad: () => Promise<void> } {
  const route = ref<any>()
  const waitResolve = ref()
  const waitPromise = new Promise((resolve) => {
    waitResolve.value = resolve
  })
  const waitLoad = async () => {
    return waitPromise
  }

  onLoad((pageQuery) => {
    route.value = Navigate.getRoute() as any
    (route.value as any).query = pageQuery

    nextTick(() => {
      waitResolve.value()
    })

    waitLoad()
    load?.()
  })

  return {
    route,
    waitLoad: waitLoad as () => Promise<void>,
  }
}
