/**
 * @file 定义接口错误类型，并处理
 */
import type { AxiosError, AxiosRequestConfig } from 'axios'

/** HTTP 请求错误基类 */
export class HttpError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public config?: AxiosRequestConfig,
  ) {
    super(message)
  }

  public handle() {
    console.log(this)
  }
}

/** HTTP 网络异常错误 */
export class NetworkError extends HttpError {
  constructor(error: AxiosError) {
    super(
      error.message,
      'NETWORK_ERROR',
      error.response?.status,
      error.config,
    )
  }
}

/** HTTP 鉴权异常错误 */
export class AuthError extends HttpError {
  constructor(error: AxiosError) {
    super(
      'Unauthorized',
      'AUTH_ERROR',
      401,
      error.config,
    )
  }

  public handle() {
    // 可以处理跳转到登录页或者其他操作
  }
}

/** HTTP 业务异常错误 */
export class BusinessError extends HttpError {
  constructor(error: AxiosError) {
    super(
      (error.response?.data as any)?.message || 'Business Error',
      'BUSINESS_ERROR',
      error.response?.status,
      error.config,
    )
  }
}
