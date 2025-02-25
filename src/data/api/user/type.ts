/**
 * @file 用户接口请求请求参数以及返回值
 */
import type { IUser } from '@/model/IUserVO.ts'

/**
 * 登录接口请求参数
 */
export interface ILoginVO {
  username: string
  password: string
  captcha: string
  checkKey: number
}

/**
 * 登录接口放回值
 */
export interface ILoginResponseVO {
  token: string
  refreshToken: string
  userInfo: IUser
}
