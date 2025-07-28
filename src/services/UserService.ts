import type { IUser, IUserVO } from '@/model/IUserVO'
import type { IUserRepository } from '@/repositories'
import type { Ref } from 'vue'
import { USER_REPOSITORY_TOKEN } from '@/repositories'
import { inject, injectable, singleton } from '@/shared/di'
import { readonly, ref } from 'vue'
import { type IUserService, USER_SERVICE_TOKEN } from './IUserService'

/**
 * 用户服务实现
 * 负责用户相关的业务逻辑，使用Repository进行数据持久化
 */

@singleton()
@injectable({ token: USER_SERVICE_TOKEN })
export class UserService implements IUserService {
  private _userName = ref('swdenglian')

  public get userName(): Readonly<Ref<string>> {
    return readonly(this._userName)
  }

  constructor(
    @inject(USER_REPOSITORY_TOKEN) private userRepository: IUserRepository,
  ) { }

  updateUserName(name: string): void {
    // 只能通过这个方法修改用户名
    this._userName.value = name
  }

  async getCurrentUser(): Promise<IUserVO | null> {
    try {
      return await this.userRepository.getCurrentUser()
    }
    catch (error) {
      console.error('获取当前用户失败:', error)
      return null
    }
  }

  async updateUser(updates: Partial<IUser>): Promise<void> {
    try {
      const currentUserVO = await this.userRepository.getCurrentUser()
      if (!currentUserVO) {
        throw new Error('用户未登录')
      }

      // 如果有API更新，先调用API
      if (Object.keys(updates).length > 0) {
        // 这里可以调用API更新用户信息
        // await api.updateUser(currentUserVO.user.id, updates)
      }

      // 更新本地存储
      const updatedUserVO: IUserVO = {
        ...currentUserVO,
        user: { ...currentUserVO.user, ...updates },
      }
      await this.userRepository.saveUser(updatedUserVO)
    }
    catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    }
  }

  async login(_username: string, _password: string): Promise<IUserVO> {
    try {
      // 调用登录API
      // const response = await api.login({ username, password })

      // 模拟登录响应
      const mockUser: IUser = {
        id: '1',
        username: _username,
        realname: _username,
        avatar: null,
        birthday: null,
        sex: null,
        email: `${_username}@example.com`,
        phone: '13800138000',
        orgCode: 'ORG001',
        loginTenantId: 1,
        orgCodeTxt: '示例组织',
        status: 1,
        delFlag: 0,
        workNo: null,
        post: null,
        telephone: null,
        createBy: 'system',
        createTime: new Date().toISOString(),
        updateBy: 'system',
        updateTime: new Date().toISOString(),
        activitiSync: null,
        userIdentity: null,
        departIds: null,
        relTenantIds: null,
        clientId: null,
        homePath: null,
        postText: null,
        bpmStatus: null,
      }

      const mockUserVO: IUserVO = {
        token: `mock_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
        user: mockUser,
      }

      // 保存用户信息到本地
      await this.userRepository.saveUser(mockUserVO)

      return mockUserVO
    }
    catch (error) {
      console.error('用户登录失败:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      const token = await this.userRepository.getToken()

      // 如果有token，调用登出API
      if (token) {
        // await api.logout(token)
      }

      // 清除本地用户数据
      await this.userRepository.clearUserData()
    }
    catch (error) {
      console.error('用户登出失败:', error)
      throw error
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = await this.userRepository.getRefreshToken()
      if (!refreshToken) {
        throw new Error('刷新令牌不存在')
      }

      // 调用刷新token API
      // const response = await api.refreshToken(refreshToken)

      // 模拟刷新token响应
      const newToken = `refreshed_token_${Date.now()}`

      // 保存新的token
      await this.userRepository.saveToken(newToken)

      return newToken
    }
    catch (error) {
      console.error('刷新令牌失败:', error)
      throw error
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const user = await this.userRepository.getCurrentUser()
      const token = await this.userRepository.getToken()

      return !!(user && token)
    }
    catch (error) {
      console.error('检查登录状态失败:', error)
      return false
    }
  }
}
