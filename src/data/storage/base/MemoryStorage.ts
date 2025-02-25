// MemoryStorage实现
import { createExpireDate } from './shared'

export class MemoryStorage {
  private static store: Map<string, { value: any, expire: string }> = new Map()

  public clear(): void {
    MemoryStorage.store.clear()
  }

  public getItem<T>(key: string): T | null {
    const item = MemoryStorage.store.get(key)
    if (!item)
      return null

    if (item.expire && new Date(item.expire) < new Date()) {
      MemoryStorage.store.delete(key)
      return null
    }
    return item.value as T
  }

  public setItem<T>(key: string, value: T, expire: Date = createExpireDate(7)): T | null {
    try {
      MemoryStorage.store.set(key, {
        value,
        expire: expire.toISOString(),
      })
      return value
    }
    catch (error: any) {
      console.error(error)
      return null
    }
  }
}
