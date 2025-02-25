import type { ILoginVO } from '@/data/api/user/type'
import type { IUserVO } from '@/model/IUserVO'
import { httpUserLoginApi } from '@/data/api/user'
import { storage, STORAGE_KEY } from '@/data/storage'
import axios from 'axios'
import { defineStore } from 'pinia'

interface UserState {
  user: IUserVO | null
  token: string | null
  refreshToken: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    const storedUser = storage.getItemSync<IUserVO | null>(STORAGE_KEY.USER_DOMAIN)
    return ({
      user: storedUser,
      token: storedUser?.token ?? null,
      refreshToken: storedUser?.refreshToken ?? null,
    })
  },
  actions: {
    async setUser(user: IUserVO) {
      this.refreshToken = user.refreshToken
      this.user = user
      this.token = user.token
      await storage.setItem(STORAGE_KEY.USER_DOMAIN, user)
    },
    async setToken(token: string | null) {
      if (!this.user)
        return
      this.token = token
      this.user.token = token
      await storage.setItem(STORAGE_KEY.USER_DOMAIN, this.user)
    },
    async getRefreshToken(): Promise<string | null> {
      return this.refreshToken
    },
    async getToken(): Promise<string | null> {
      return this.token
    },
    async doRefreshToken(): Promise<string> {
      const refreshToken = await this.getRefreshToken()
      const response = await axios.post('/auth/refresh', { refreshToken })
      const newTokenInfo = response.data
      await this.setToken(newTokenInfo.token)
      return newTokenInfo.token
    },
    async login(params: ILoginVO) {
      const response = await httpUserLoginApi(params)
      if (response.success) {
        await this.setUser({
          token: response.result.token,
          refreshToken: response.result.refreshToken,
          user: response.result.userInfo,
        })
      }
      return response
    },
  },
})

export const UserDomain = () => useUserStore()
