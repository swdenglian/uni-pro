/**
 * @file Axios 错误情况处理
 */
import type { AxiosError } from 'axios'

import { AuthError, BusinessError, HttpError, NetworkError } from '@/data/api/error'
import axios from 'axios'

export class ErrorHandler {
  formatError(error: AxiosError): HttpError {
    const { message, response, config } = error as AxiosError
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return new NetworkError(error)
      }

      if (error.response.status === 401) {
        return new AuthError(error)
      }

      return new BusinessError(error)
    }

    return new HttpError(message, 'NETWORK_ERROR', response?.status, config)
  }

  handle(error: AxiosError) {
    this.formatError(error).handle()
  }
}
