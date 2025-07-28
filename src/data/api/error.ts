import type { IAuthService } from '@/services/IAuthService'
/**
 * @file 定义接口错误类型，并处理
 */
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { AUTH_SERVICE_TOKEN } from '@/services/IAuthService'
import { container } from '@/shared/di'

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
    // 通过依赖注入获取认证服务并处理认证失败
    try {
      const authService = container.resolve<IAuthService>(AUTH_SERVICE_TOKEN)
      authService.handleAuthFailure().catch((error) => {
        console.error('处理认证失败时出错:', error)
      })
    }
    catch (error) {
      console.error('无法获取认证服务:', error)
      // 降级处理：直接跳转到登录页
      uni.reLaunch({
        url: '/ui/pages/login/index',
      })
    }
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
