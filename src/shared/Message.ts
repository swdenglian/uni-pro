export class Message {
  /**
   * 仅文字提示
   * @param message
   */
  public static toast(message: string): void {
    uni.showToast({
      icon: 'none',
      title: message,
      duration: 2000, // Taro默认2000ms，uni-app默认1500ms，此处保持一致[9,10](@ref)
    })
  }

  /**
   * 带勾的成功提醒
   * @param message
   */
  public static success(message: string): void {
    uni.showToast({
      icon: 'success',
      title: message,
    })
  }

  /**
   * 失败提醒
   * @param message
   */
  public static error(message: string): void {
    uni.showToast({
      icon: 'error',
      title: message,
    })
  }

  /**
   * 弹窗交互
   * @param params
   */
  public static modal(params: Parameters<typeof uni.showModal>[0]): Promise<UniNamespace.ShowModalRes> {
    return new Promise((resolve) => {
      uni.showModal({
        ...params,
        success: resolve,
      })
    })
  }
}
