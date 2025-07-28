import type { IUserVO } from '@/model/IUserVO'
import type { Ref } from 'vue'
import type { IUser } from '../model/IUserVO'

// 用户服务接口
export interface IUserService {
  getCurrentUser: () => Promise<IUserVO | null>
  updateUser: (updates: Partial<IUser>) => Promise<void>
  login: (username: string, password: string) => Promise<IUserVO>
  logout: () => Promise<void>
  refreshToken: () => Promise<string>
  isLoggedIn: () => Promise<boolean>
  updateUserName: (name: string) => void
  // 使用readonly包装的Ref，确保外部无法修改
  readonly userName: Readonly<Ref<string>>
}

export const USER_SERVICE_TOKEN = Symbol('USER_SERVICE_TOKEN')
