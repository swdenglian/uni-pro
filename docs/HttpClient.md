# HttpClient 类文档

## When To Use
`HttpClient` 适用于需要统一管理 HTTP 请求的场景，例如：
- 前后端分离项目中需要标准化请求/响应格式
- 需要添加全局请求头（如 Token）或响应处理（如状态码校验）
- 多端（小程序/网页）环境需要适配不同 HTTP 适配器
- 需要集中管理请求超时、重试等错误处理逻辑

## 1. 概述
`HttpClient` 是一个基于 **Axios** 的 HTTP 客户端封装类，用于统一管理 HTTP 请求的发送、拦截器处理及错误处理。支持 **GET/POST** 等通用请求方法，并提供灵活的拦截器扩展能力。

---

## API
### 类属性
| 属性名       | 类型                | 说明                                                                 | 版本  |
|--------------|---------------------|----------------------------------------------------------------------|-------|
| `axios`      | `AxiosInstance`     | Axios 实例，负责底层 HTTP 请求的发送与响应处理。               | 1.0.0 |
| `interceptors` | `Interceptor[]`     | 拦截器数组，支持请求拦截 (`request`) 和响应拦截 (`response`) 的扩展。 | 1.0.0 |
| `errorHandler` | `ErrorHandler`      | 错误处理类，统一处理请求异常并返回标准化错误信息。               | 1.0.0 |

---

### 构造函数
```typescript
constructor(config?: AxiosRequestConfig)
```
- **参数**：
  - `config`：Axios 配置对象（可选），支持设置 `timeout`（超时时间，默认 10000ms）、`baseURL`（基础 URL）等。
- **默认配置**：
  - `timeout: 10000`
  - `adapter: createUniAppAxiosAdapter()`（适配小程序环境）

---

### 拦截器管理
### 4.1 请求拦截器
```typescript
private setupAxiosInterceptors() {
  this.axios.interceptors.request.use(
    async (config) => {
      // 遍历拦截器链，修改请求配置
      for (const interceptor of this.interceptors) {
        if (interceptor.request) {
          config = await interceptor.request(config)
        }
      }
      return config
    },
    error => Promise.reject(error)
  )
}
```
- **功能**：
  - 在请求发送前拦截并修改配置（如添加 Token、请求头等）。
- **扩展方式**：
  ```typescript
  httpClient.addInterceptor({
    request: async (config) => {
      config.headers.Authorization = `Bearer ${getToken()}`
      return config
    }
  })
  ```

---

### 4.2 响应拦截器
```typescript
this.axios.interceptors.response.use(
  async (response) => {
    // 遍历拦截器链，修改响应数据
    for (const interceptor of [...this.interceptors].reverse()) {
      if (interceptor.response) {
        response = await interceptor.response(response)
      }
    }
    return response
  },
  (error) => {
    return Promise.reject(this.errorHandler.handle(error))
  }
)
```
- **功能**：
  - 在响应返回前拦截并修改数据（如统一处理状态码、格式化数据）。
- **错误处理**：
  - 调用 `errorHandler` 处理异常，返回标准化错误响应。

---

### 错误处理
- **统一处理逻辑**：
  - 通过 `ErrorHandler` 类捕获请求异常（如网络错误、超时），并返回包含 **错误码** 和 **错误消息** 的标准化对象。
- **示例**：
  ```typescript
  try {
    const response = await httpClient.get('/api/data')
  }
  catch (error) {
    console.error('请求失败:', error.message) // 输出标准化错误信息
  }
  ```

---

### 请求方法
### 6.1 通用请求方法
```typescript
request<T = any, R = IResponse<T>, D = any>(
  configOrUrl: string | AxiosRequestConfig<D>,
  config?: AxiosRequestConfig<D>
): Promise<R>
```
- **功能**：
  - 支持两种调用形式：
    - `httpClient.request({ url: '/api', method: 'POST' })`
    - `httpClient.request('/api', { method: 'POST' })`。
- **返回值**：
  - 解析后的响应数据（基于泛型 `T`）。

---

### 6.2 GET 请求
```typescript
async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
```
- **功能**：
  - 发送 GET 请求，自动拼接 URL 和参数。

---

### 6.3 POST 请求
```typescript
async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
```
- **功能**：
  - 发送 POST 请求，支持表单数据 (`application/x-www-form-urlencoded`) 或 JSON 数据 (`application/json`)。

---

## Examples
### 基础使用示例
```typescript
// 全局初始化（main.ts）
export const httpClient = new HttpClient({ baseURL: 'https://api.example.com' });

// 发送 GET 请求
httpClient.get('/users/123').then(user => {
  console.log('用户信息:', user);
}).catch(error => {
  console.error('请求失败:', error.message);
});

// 发送 POST 请求
httpClient.post('/login', { username: 'admin', password: '123' }, {
  headers: { 'Content-Type': 'application/json' }
}).then(result => {
  console.log('登录结果:', result);
});
```

### 拦截器扩展示例
```typescript
// 添加 Token 拦截器
httpClient.addInterceptor({ 
  request: async (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
});

// 添加响应格式化拦截器
httpClient.addInterceptor({ 
  response: async (response) => {
    return response.data; // 直接返回业务数据，跳过 Axios 包装对象
  }
});
```

## 使用建议
1. **单例模式**：
   - 全局创建一个 `HttpClient` 实例，避免重复创建导致资源浪费。
   ```typescript
   // main.ts
   export const httpClient = new HttpClient()
   ```
2. **拦截器扩展**：
   - 添加全局拦截器（如 Token 续期、日志记录）。
3. **错误重试**：
   - 结合拦截器实现请求重试逻辑（如网络超时自动重试）。

---

## 参考资料
- [Axios 官方文档](https://axios-http.com/docs/intro)
