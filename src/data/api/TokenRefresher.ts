import type { UserDomain } from '@/domain'

/**
 * @file Token 刷新器，暂时无用
 */

export class TokenRefresher {
  private isRefreshing = false
  private refreshQueue: ((token: string) => void)[] = []

  constructor(private userDomain: ReturnType<typeof UserDomain>) {}

  async refresh() {
    if (this.isRefreshing) {
      // 返回一个Promise，将resolve函数放入队列
      return new Promise<string>((resolve) => {
        this.refreshQueue.push(resolve)
      })
    }

    this.isRefreshing = true

    try {
      const token = await this.userDomain.doRefreshToken()

      // 执行队列中的回调
      this.refreshQueue.forEach(callback => callback(token))
      this.refreshQueue = []

      return token
    }
    finally {
      this.isRefreshing = false
    }
  }
}
