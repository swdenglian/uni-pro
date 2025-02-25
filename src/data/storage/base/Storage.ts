import { MemoryStorage } from './MemoryStorage'
import { createExpireDate } from './shared'
import { UniStorage } from './UniStorage'

export class Storage {
  private UniStorage: UniStorage
  private memoryStorage: MemoryStorage

  constructor() {
    this.UniStorage = new UniStorage()
    this.memoryStorage = new MemoryStorage()
  }

  async clear(): Promise<void> {
    this.memoryStorage.clear()
    await this.UniStorage.clearStorage()
  }

  async getItem<T>(key: string): Promise<T | null> {
    const memoryItem = this.memoryStorage.getItem<T>(key)
    if (memoryItem !== null) {
      return memoryItem
    }

    // 如果内存中没有，从持久化存储中获取
    const data = await this.UniStorage.getStorage<T>(key)
    if (data) {
      // 将数据缓存到内存中
      this.memoryStorage.setItem(key, data)
      return data
    }

    return null
  }

  async setItem<T>(
    key: string,
    value: T,
        expire: Date = createExpireDate(),
  ): Promise<T | null> {
    try {
      // 同时存储到内存和持久化存储中
      this.memoryStorage.setItem(key, value, expire)
      await this.UniStorage.setStorage({ key, data: value, expire })
      return value
    }
    catch (error: any) {
      console.error(error)
      return null
    }
  }
}
