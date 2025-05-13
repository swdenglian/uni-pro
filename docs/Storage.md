# Storage

## When To Use

`Storage` 类适用于需要兼顾快速读取与数据持久化的跨平台场景，例如：
- 用户登录态（Token）存储
- 高频访问的配置项缓存
- 临时表单数据暂存

---

## Examples

### 基础用法
```tsx
// 初始化实例（通常由框架注入）
const storage = new Storage();

// 存储用户信息（默认7天过期）
await storage.setItem('user', { name: '张三', age: 25 });

// 获取用户信息（优先从内存读取）
const user = await storage.getItem<User>('user');

// 清空所有存储
await storage.clear();
```

### 自定义过期时间
```tsx
// 存储临时验证码（5分钟后过期）
const expire = new Date(Date.now() + 5 * 60 * 1000);
await storage.setItem('captcha', '123456', expire);
```

---

## API

### 属性
| 属性名称          | 类型               | 描述                              | 版本  |
|-------------------|--------------------|-----------------------------------|-------|
| `private UniStorage` | `UniStorage`       | 持久化存储实例（基于 Uni-App API） | 1.0.0 |
| `private memoryStorage` | `MemoryStorage` | 内存缓存实例                      | 1.0.0 |

### 方法
| 方法名                          | 描述                                                                 | 参数                                                                 | 返回值               | 默认值       | 版本  |
|---------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|----------------------|--------------|-------|
| `clear()`                       | 同步清除内存缓存和持久化存储中的全部数据                             | -                                                                    | `Promise<void>`      | -            | 1.0.0 |
| `getItem<T>(key: string)`       | 优先从内存读取，无数据则从持久化存储读取并自动缓存                   | `key` (string): 数据键名                                             | `Promise<T | null>`  | -            | 1.0.0 |
| `getItemSync<T>(key: string)`   | 同步版本获取方法（注意：持久化存储同步读取可能阻塞主线程）           | `key` (string): 数据键名                                             | `T | null`           | -            | 1.1.0 |
| `setItem<T>(key, value, expire)`| 同时更新内存缓存和持久化存储，支持设置过期时间（默认7天）             | `key` (string): 键名<br>`value` (T): 数据<br>`expire?` (Date): 过期时间 | `Promise<T | null>`  | `createExpireDate()` | 1.0.0 |

### `clear()`

**清空所有存储数据**

- **功能**: 同步清除内存缓存和持久化存储中的全部数据
- **返回值**: `Promise<void>`
- **示例**:
  ```typescript
  await storage.clear()
  ```

---

### `getItem<T>(key: string): Promise<T | null>`
**获取指定键的数据**

- **功能**:
  1. 优先从内存缓存读取数据
  2. 若内存无数据则从持久化存储读取
  3. 成功读取后自动将数据缓存到内存
- **参数**:
  - `key` (string): 数据键名
- **返回值**: `Promise<T | null>` - 返回数据或 `null`（不存在/已过期）
- **示例**:
  ```typescript
  // 获取用户信息
  const user = await storage.getItem<User>('user_info')
  ```

---

### `setItem<T>(key: string, value: T, expire?: Date): Promise<T | null>`
**设置指定键的数据**

- **功能**:
  1. 同时更新内存缓存和持久化存储
  2. 支持设置数据过期时间（默认 24 小时）
- **参数**:
  - `key` (string): 数据键名
  - `value` (T): 要存储的数据
  - `expire?` (Date): [可选] 过期时间（默认 `createExpireDate()` 7天）
- **返回值**: `Promise<T | null>` - 成功存储返回原数据，失败返回 `null`
- **错误处理**:
  ```typescript
  try {
    await storage.setItem('token', 'abc123')
  }
  catch (error) {
    console.error('存储失败:', error)
  }
  ```
- **示例**:
  ```typescript
  // 存储带过期时间的token（7天）
  const token = 'user_token'
  await storage.setItem<string>(token, token, new Date(Date.now() + 7 * 24 * 60 * 60))
  ```

---

## Design Token

| Token 名称           | 类型     | 描述                     | 默认值       |
|----------------------|----------|--------------------------|--------------|
| `storage.maxMemory`  | `number` | 内存缓存最大容量（MB）   | 10           |
| `storage.expireUnit` | `string` | 默认过期时间单位         | 'day'        |

---

## FAQ

### Q: 内存缓存和持久化存储的优先级是怎样的？
A: 读取时优先内存（10ms内响应），内存无数据时读取持久化存储并自动同步到内存；写入时同时更新两者。

### Q: 微信小程序存储限制如何处理？
A: 建议对大文件（如图像）使用 `uni.saveFile` 替代，关键小数据使用 `Storage` 管理。

### Q: 数据过期后会自动清理吗？
A: 内存数据随进程结束自动清理；持久化数据在下次调用 `getItem` 时检查过期时间，过期数据返回 `null` 并自动清理。

### Q: 如何自定义内存清理策略？
A: 可通过 `storage.memoryStorage` 访问底层 `MemoryStorage` 实例，调用其 `removeItem` 或 `clear` 方法手动清理。
