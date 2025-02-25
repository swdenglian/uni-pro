/**
 * @file 接口请求错误类型
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
