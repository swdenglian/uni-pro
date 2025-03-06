/**
 * @file 创建httpClient，用于发起http请求
 */
import type { AxiosResponse } from 'axios'
import { HttpClient } from '@/data/api/HttpClient'
import { ENV } from '@/data/env'
import { UserDomain } from '@/domain'

export function createHttpClient() {
  const httpClient = new HttpClient({
    baseURL: ENV.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 添加认证拦截器
  httpClient.addInterceptor({
    request: async (config) => {
      const token = await UserDomain().getToken()

      if (token) {
        config.headers = {
          ...config.headers,
          'X-Tenant-Id': 0,
          'x-access-token': token,
          'authorization': token,
        }
      }
      return config
    },
  })

  httpClient.addInterceptor({
    response: async (response: AxiosResponse) => {
      const { data } = response

      return data
    },
  })

  return httpClient
}

export const httpClient = createHttpClient()
