/**
 * 认证服务接口
 * 负责处理登录状态和认证相关的业务逻辑
 */
export interface IAuthService {
  /**
   * 处理认证失败（401错误）
   * 清除用户数据并跳转到登录页
   */
  handleAuthFailure: () => Promise<void>

  /**
   * 检查是否已登录
   */
  isAuthenticated: () => Promise<boolean>

  /**
   * 获取登录页面路径
   */
  getLoginPath: () => string
}

export const AUTH_SERVICE_TOKEN = Symbol('IAuthService')
