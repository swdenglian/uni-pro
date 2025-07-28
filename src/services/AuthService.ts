import type { IAuthService } from './IAuthService'
import type { IUserService } from './IUserService'
import { Message, Navigate } from '@/shared'
import { inject, injectable, singleton } from '@/shared/di'
import { AUTH_SERVICE_TOKEN } from './IAuthService'
import { USER_SERVICE_TOKEN } from './IUserService'

/**
 * 认证服务实现
 * 处理用户认证状态和相关业务逻辑
 */
@singleton()
@injectable({ token: AUTH_SERVICE_TOKEN })
export class AuthService implements IAuthService {
  constructor(
    @inject(USER_SERVICE_TOKEN) private userService: IUserService,
  ) {}

  async handleAuthFailure(): Promise<void> {
    try {
      // 1. 清除用户数据
      await this.userService.logout()

      // 2. 显示提示信息
      Message.toast('登录已过期，请重新登录')

      // 3. 跳转到登录页面
      // 注意：这里需要根据你的实际登录页面路径调整
      Navigate.reLaunch({
        url: '/ui/pages/login/index', // 假设这是你的登录页面路径
      })
    }
    catch (error) {
      console.error('处理认证失败时出错:', error)
      // 即使出错也要跳转到登录页
      Navigate.reLaunch({
        url: '/ui/pages/login/index',
      })
    }
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.userService.isLoggedIn()
  }

  getLoginPath(): string {
    return '/ui/pages/login/index'
  }
}
