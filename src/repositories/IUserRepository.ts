import type { IUserVO } from '@/model/IUserVO'

/**
 * 用户数据持久层接口
 */
export interface IUserRepository {
  /**
   * 获取当前用户信息
   */
  getCurrentUser: () => Promise<IUserVO | null>

  /**
   * 保存用户信息
   */
  saveUser: (user: IUserVO) => Promise<void>

  /**
   * 获取访问令牌
   */
  getToken: () => Promise<string | null>

  /**
   * 保存访问令牌
   */
  saveToken: (token: string) => Promise<void>

  /**
   * 获取刷新令牌
   */
  getRefreshToken: () => Promise<string | null>

  /**
   * 保存刷新令牌
   */
  saveRefreshToken: (refreshToken: string) => Promise<void>

  /**
   * 清除所有用户数据
   */
  clearUserData: () => Promise<void>

  /**
   * 更新用户信息
   */
  updateUser: (updates: Partial<IUserVO>) => Promise<void>
}

// 服务标识符
export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository')
