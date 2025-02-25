/**
 * @file Http接口请求类型
 */

/**
 * 统一响应类型
 */
export interface IResponse<T> {
  /** 结果 */
  result: T
  /** 返回码：用于业务异常判断 */
  code: number
  /** 返回说明 */
  message: string
  /** 是否业务成功 */
  success: boolean
  timestamp: number
}

export interface IBasePageResult<T> {
  /** 数据列表 */
  records: T[]
  /** 总数 */
  total: number
  /** 当前页 */
  current: number
  /** 每页条数 */
  size: number
  /** 总页数 */
  pages: number
}

/** 分页请求参数 */
export type IPageParams<T> = {
  pageNo: number
  size: number
} & T
