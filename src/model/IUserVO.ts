/**
 * @file 用户视图模型
 */
export interface IUser {
  id: string
  username: string
  realname: string
  avatar: string | null
  birthday: string | null
  sex: number | null
  email: string | null
  phone: string
  orgCode: string
  loginTenantId: number
  orgCodeTxt: string | null
  status: number
  delFlag: number
  workNo: string | null
  post: string | null
  telephone: string | null
  createBy: string | null
  createTime: string | null
  updateBy: string | null
  updateTime: string | null
  activitiSync: string | null
  userIdentity: string | null
  departIds: string | null
  relTenantIds: string | null
  clientId: string | null
  homePath: string | null
  postText: string | null
  bpmStatus: string | null
}

export interface IUserVO {
  token: string | null
  refreshToken: string | null
  user: IUser
}
