import type { ILoginResponseVO, ILoginVO } from '@/data/api/user/type'
import { httpClient } from '@/data/api/createHttpClient'

/**
 * 登录
 * @param params
 */
export function httpUserLoginApi(params: ILoginVO) {
  return httpClient.request<ILoginResponseVO>({
    url: '/sys/login',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    data: params,
  })
}

/**
 * 获取登录验证码
 * @param currDateTime
 */
export function getLoginRandomCodeApi(currDateTime: number) {
  return httpClient.request<string>({
    url: `/sys/randomImage/${currDateTime}`,
    method: 'GET',
  })
}
