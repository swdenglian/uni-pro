export class Navigate {
  /**
   * 路由压栈
   * @param params
   */
  public static push(params: Parameters<typeof uni.navigateTo>[0]) {
    uni.navigateTo(params)
  }

  /**
   * 路由退栈
   * @param delta 可选参数，表示返回的页面层级，默认返回上一级
   */
  public static back(delta: number = 1) {
    uni.navigateBack({ delta })
  }

  /**
   * 重启App
   * @param params
   */
  public static reLaunch(params: Parameters<typeof uni.reLaunch>[0]) {
    uni.reLaunch(params)
  }

  /**
   * 替换当前路由
   * @param params
   */
  public static redirect(params: Parameters<typeof uni.redirectTo>[0]) {
    uni.redirectTo(params)
  }
}
