/**
 * @file 业务错误处理器
 */
import type { HttpError } from '@/data/api/error.ts'
import type { AxiosError } from 'axios'
import { AuthError, BusinessError, NetworkError } from '@/data/api/error.ts'
import axios from 'axios'

export class ErrorHandler {
  handle(error: AxiosError | HttpError): never {
    if (error instanceof NetworkError) {
      return this.handleNetworkError(error)
    }

    if (error instanceof AuthError) {
      return this.handleAuthError(error)
    }

    if (error instanceof BusinessError) {
      return this.handleBusinessError(error)
    }

    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new NetworkError(error)
      }

      if (error.response.status === 401) {
        throw new AuthError(error)
      }

      throw new BusinessError(error)
    }

    throw error
  }

  private handleNetworkError(error: NetworkError): never {
    console.error('Network Error:', error)
    throw error
  }

  private handleAuthError(error: AuthError): never {
    console.error('Auth Error:', error)
    throw error
  }

  private handleBusinessError(error: BusinessError): never {
    console.error('Business Error:', error)
    throw error
  }
}
