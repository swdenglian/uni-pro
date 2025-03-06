/**
 * @file 定义HttpClient, 用于发起HTTP请求。
 */
import type { Interceptor } from '@/data/api/interceptor'
import type { IResponse } from '@/data/api/type'
import type { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { ErrorHandler } from '@/data/api/errorHandler'
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'
import axios from 'axios'

export class HttpClient {
  private axios: AxiosInstance
  private interceptors: Interceptor[] = []
  private errorHandler: ErrorHandler

  constructor(config?: AxiosRequestConfig) {
    this.errorHandler = new ErrorHandler()
    this.axios = axios.create({
      timeout: 10000,
      ...config,
      adapter: createUniAppAxiosAdapter(),
    })

    this.setupAxiosInterceptors()
  }

  private setupAxiosInterceptors() {
    // 请求拦截器
    this.axios.interceptors.request.use(
      async (config) => {
        try {
          let currentConfig: InternalAxiosRequestConfig = { ...config }
          for (const interceptor of this.interceptors) {
            if (interceptor.request) {
              currentConfig = await interceptor.request(currentConfig) as InternalAxiosRequestConfig
            }
          }
          return currentConfig
        }
        catch (error) {
          return Promise.reject(error)
        }
      },
      error => Promise.reject(error),
    )

    // 响应拦截器
    this.axios.interceptors.response.use(
      async (response) => {
        try {
          let currentResponse = { ...response }
          for (const interceptor of [...this.interceptors].reverse()) {
            if (interceptor.response) {
              currentResponse = await interceptor.response(currentResponse)
            }
          }
          return currentResponse
        }
        catch (error) {
          return Promise.reject(error)
        }
      },
      (error) => {
        try {
          return Promise.reject(this.errorHandler.handle(error))
        }
        catch (handledError) {
          return Promise.reject(handledError)
        }
      },
    )
  }

  addInterceptor(interceptor: Interceptor) {
    this.interceptors.push(interceptor)
  }

  // 通用请求方法，支持两种调用形式
  request<T = any, R = IResponse<T>, D = any>(
    configOrUrl: string | AxiosRequestConfig<D>,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    // 处理两种不同的调用签名
    const finalConfig = typeof configOrUrl === 'string'
      ? { ...config, url: configOrUrl }
      : configOrUrl

    return this.axios.request(finalConfig)
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      return await this.request(url, {
        ...config,
        method: 'GET',
      })
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      return await this.request(url, {
        ...config,
        data,
        method: 'POST',
      })
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }
}
