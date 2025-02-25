export class UniStorage {
  private storageKey = 'uni_storage'

  public async clearStorage() {
    uni.clearStorageSync()
  }

  public async getStorage<T = any>(key: string) {
    try {
      const item = await uni.getStorage({
        key: `${this.storageKey}_${key}`,
      })

      if (!item || !item.data) {
        return null
      }

      const { value, expire } = item.data

      if (expire && new Date(expire) < new Date()) {
        await this.removeStorage(key)
        return null
      }

      return value as T
    }
    catch {
      return null
    }
  }

  public getStorageSync<T = any>(key: string) {
    try {
      const item = uni.getStorageSync(`${this.storageKey}_${key}`)

      if (!item || !item.data) {
        return null
      }

      const { value, expire } = item.data

      if (expire && new Date(expire) < new Date()) {
        this.removeStorageSync(key)
        return null
      }

      return value as T
    }
    catch {
      return null
    }
  }

  public async setStorage<T = any>(option: { data: T, key: string, expire?: Date }) {
    const { data, key: storageKey, expire } = option
    const storageData: { value: T, expire?: string } = { value: data }

    if (expire) {
      storageData.expire = expire.toISOString()
    }

    uni.setStorageSync(`${this.storageKey}_${storageKey}`, storageData)
  }

  private async removeStorage(key: string) {
    await uni.removeStorage({
      key: `${this.storageKey}_${key}`,
    })
  }

  private async removeStorageSync(key: string) {
    uni.removeStorageSync(`${this.storageKey}_${key}`)
  }
}
