# Storage 类文档

## 概述

`Storage` 类是一个双层级存储管理器，结合 **内存缓存** 和 **持久化存储**（Uni-App 跨平台存储）实现高效数据管理。适用于需要快速读取且数据持久化的场景。

---

## 属性

| 属性名称          | 类型               | 描述                              |
|-------------------|--------------------|-----------------------------------|
| `private UniStorage` | `UniStorage`       | 持久化存储实例（基于 Uni-App API） |
| `private memoryStorage` | `MemoryStorage` | 内存缓存实例                      |

---

## 方法

### `clear()`

**清空所有存储数据**

- **功能**: 同步清除内存缓存和持久化存储中的全部数据
- **返回值**: `Promise<void>`
- **示例**:
  ```typescript
  await storage.clear();
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
  const user = await storage.getItem<User>('user_info');
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
    await storage.setItem('token', 'abc123');
  } catch (error) {
    console.error('存储失败:', error);
  }
  ```
- **示例**:  
  ```typescript
  // 存储带过期时间的token（7天）
  const token = 'user_token';
  await storage.setItem<string>(token, token, new Date(Date.now() + 7 * 24 * 60 * 60));
  ```

---

## 使用说明

### 缓存策略
1. **优先读取内存**：10ms 内快速响应  
2. **自动持久化**：首次访问冷数据时会自动缓存到内存  
3. **过期处理**：  
   - 内存数据随进程结束失效  
   - 持久化数据按 `expire` 字段自动失效

### 数据类型支持
- 支持原生类型及复杂对象  
- **注意**: 需自行处理 JSON 序列化/反序列化（如存储对象前使用 `JSON.stringify`）

---

## 注意事项

1. **存储限制**  
   - 微信小程序：单账号 10MB  
   - H5/APP：无明确限制（受设备存储空间影响）

2. **异常处理**  
   - 持久化存储失败时内存缓存仍保留数据  
   - 建议关键数据添加重试机制

3. **内存管理**  
   - 避免存储过量数据导致内存泄漏  
   - 可通过 `memoryStorage` 实现自定义清理策略

---