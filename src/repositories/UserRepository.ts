import type { IUserVO } from '@/model/IUserVO'
import type { IUserRepository } from './IUserRepository'
import { storage, STORAGE_KEY } from '@/data/storage'
import { injectable } from '@/shared'
import { USER_REPOSITORY_TOKEN } from './IUserRepository'

/**
 * 用户数据持久层实现
 * 基于本地存储的用户数据管理
 */
@injectable({ token: USER_REPOSITORY_TOKEN })
export class UserRepository implements IUserRepository {
  private readonly USER_KEY = STORAGE_KEY.USER_DOMAIN
  private readonly TOKEN_KEY = 'user_token'
  private readonly REFRESH_TOKEN_KEY = 'user_refresh_token'

  async getCurrentUser(): Promise<IUserVO | null> {
    try {
      return await storage.getItem<IUserVO | null>(this.USER_KEY)
    }
    catch (error) {
      console.error('获取用户信息失败:', error)
      return null
    }
  }

  async saveUser(user: IUserVO): Promise<void> {
    try {
      await storage.setItem(this.USER_KEY, user)
      // 同时保存 token 信息
      if (user.token) {
        await this.saveToken(user.token)
      }
      if (user.refreshToken) {
        await this.saveRefreshToken(user.refreshToken)
      }
    }
    catch (error) {
      console.error('保存用户信息失败:', error)
      throw error
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const user = await this.getCurrentUser()
      return user?.token || await storage.getItem<string | null>(this.TOKEN_KEY)
    }
    catch (error) {
      console.error('获取token失败:', error)
      return null
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      await storage.setItem(this.TOKEN_KEY, token)
      // 同时更新用户信息中的 token
      const user = await this.getCurrentUser()
      if (user) {
        user.token = token
        await storage.setItem(this.USER_KEY, user)
      }
    }
    catch (error) {
      console.error('保存token失败:', error)
      throw error
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      const user = await this.getCurrentUser()
      return user?.refreshToken || await storage.getItem<string | null>(this.REFRESH_TOKEN_KEY)
    }
    catch (error) {
      console.error('获取refresh token失败:', error)
      return null
    }
  }

  async saveRefreshToken(refreshToken: string): Promise<void> {
    try {
      await storage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
      // 同时更新用户信息中的 refreshToken
      const user = await this.getCurrentUser()
      if (user) {
        user.refreshToken = refreshToken
        await storage.setItem(this.USER_KEY, user)
      }
    }
    catch (error) {
      console.error('保存refresh token失败:', error)
      throw error
    }
  }

  async clearUserData(): Promise<void> {
    try {
      // 使用setItem设置为null来清除数据
      await Promise.all([
        storage.setItem(this.USER_KEY, null),
        storage.setItem(this.TOKEN_KEY, null),
        storage.setItem(this.REFRESH_TOKEN_KEY, null),
      ])
    }
    catch (error) {
      console.error('清除用户数据失败:', error)
      throw error
    }
  }

  async updateUser(updates: Partial<IUserVO>): Promise<void> {
    try {
      const currentUser = await this.getCurrentUser()
      if (!currentUser) {
        throw new Error('用户不存在，无法更新')
      }

      const updatedUser = { ...currentUser, ...updates }
      await this.saveUser(updatedUser)
    }
    catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }
}
