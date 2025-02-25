# Navigate 类文档

`Navigate` 类封装了 uni-app 的路由跳转功能，提供页面压栈、退栈、重启和替换路由等操作。以下是方法说明：

---

## 方法说明

### 1. `push(params: Parameters<typeof uni.navigateTo>[0])`
**功能**：保留当前页面，跳转到应用内的某个页面，使用 `uni.navigateBack` 可返回原页面。  
**参数**：  
- `params` (object): 跳转配置，支持 `url`、`events` 等属性。  
**示例**：  
```typescript
Navigate.push({ url: '/pages/detail?id=123' });
```

---

### 2. `back(delta: number = 1)`
**功能**：关闭当前页面，返回上一页面或多级页面。  
**参数**：  
- `delta` (number): 返回的页面层级，默认返回上一级（`delta=1`）。  
**示例**：  
```typescript
Navigate.back(); // 返回上一级
Navigate.back(2); // 返回两级
```

---

### 3. `reLaunch(params: Parameters<typeof uni.reLaunch>[0])`
**功能**：关闭所有页面，打开到应用内的某个页面。  
**参数**：  
- `params` (object): 跳转配置，支持 `url` 等属性。  
**示例**：  
```typescript
Navigate.reLaunch({ url: '/pages/home' });
```

---

### 4. `redirect(params: Parameters<typeof uni.redirectTo>[0])`
**功能**：关闭当前页面，跳转到应用内的某个页面，不可返回。  
**参数**：  
- `params` (object): 跳转配置，支持 `url` 等属性。  
**示例**：  
```typescript
Navigate.redirect({ url: '/pages/login' });
```

---

## 注意事项
1. **路由传参**：  
   - 可通过 `url` 的 `query` 参数传递简单数据（如 `?id=123`）。  
   - 复杂数据建议使用 `eventChannel` 通过 `uni.navigateTo` 的 `success` 回调传递。  
2. **工具推荐**：  
   - 使用 `vite-plugin-uni-pages` 管理路由配置。  
   - 通过 `uni-app-types` 获得路由 API 的 TypeScript 类型支持。  
