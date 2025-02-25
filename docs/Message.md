# Message 类文档

## 概述
`Message` 类提供了一组静态方法，用于在应用中显示不同类型的提示和交互弹窗。支持文字提示、成功/失败状态提示以及模态对话框功能。

---

## 方法说明

### 1. `toast(message: string): void`
**功能**：显示仅文字提示的浮层。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.toast("操作完成");
```

---

### 2. `success(message: string): void`
**功能**：显示带勾号的成功状态提示。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.success("保存成功");
```

---

### 3. `error(message: string): void`
**功能**：显示带叉号的失败状态提示。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.error("网络连接失败");
```

---

### 4. `modal(params: Parameters<typeof uni.showModal>[0]): Promise<uni.ShowModalResult>`
**功能**：弹出可交互的模态对话框。

**参数**：
- `params` (object): 配置项，支持 `title`、`content`、`confirmText`、`cancelText` 等属性。

**返回值**：
- `Promise<uni.ShowModalResult>`: 包含用户操作结果（`confirm` 或 `cancel`）的 Promise 对象。

**示例**：
```typescript
Message.modal({
  title: "提示",
  content: "确定要删除吗？",
  confirmText: "确认",
  cancelText: "取消"
}).then(result => {
  if (result.confirm) {
    console.log("用户确认");
  } else {
    console.log("用户取消");
  }
});
```

---

## 注意事项
- `toast` 方法的 `duration` 默认值为 `2000ms`，与 Taro 框架保持一致，而 uni-app 默认为 `1500ms`。
- 模态对话框的样式和交互逻辑依赖 `uni-app` 的 API 实现，具体参数可参考 [uni.showModal 文档](https://uniapp.dcloud.io/api/ui/modal)。
