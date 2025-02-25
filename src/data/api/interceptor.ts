/**
 * @file 定义 HttpClient 拦截器
 */
import type { HttpError } from '@/data/api/error'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface Interceptor {
  request?: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig> | AxiosRequestConfig
  response?: (response: AxiosResponse) => Promise<AxiosResponse> | AxiosResponse
  error?: (error: HttpError) => Promise<never>
}
