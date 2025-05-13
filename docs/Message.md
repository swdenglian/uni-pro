# Message 类文档

## 概述
`Message` 类提供了一组静态方法，用于在应用中显示不同类型的提示和交互弹窗。支持文字提示（`toast`）、成功/失败状态提示（`success`/`error`）以及可交互的模态对话框（`modal`）功能，底层依赖 uni-app 原生 API 实现。

---

## When To Use
- 需要显示轻量级临时提示（如操作结果反馈）时，使用 `toast`（无图标）、`success`（带成功图标）或 `error`（带失败图标）。
- 需要用户确认/取消关键操作（如删除确认）时，使用 `modal` 模态对话框。

---

## Examples
### 基础提示
```typescript
// 纯文字提示（2秒后自动消失）
Message.toast('操作完成');

// 成功状态提示
Message.success('保存成功');

// 失败状态提示
Message.error('网络连接失败');
```

### 模态对话框交互
```typescript
Message.modal({ 
  title: '删除确认', 
  content: '确定要删除此文件吗？', 
  confirmText: '删除', 
  cancelText: '取消' 
}).then((result) => { 
  if (result.confirm) { 
    console.log('执行删除操作'); 
  } else { 
    console.log('取消删除'); 
  } 
});
```

---

## API
| Property       | Description                          | Type                                  | Default       | Version |
|----------------|--------------------------------------|---------------------------------------|---------------|---------|
| `toast`        | 显示纯文字提示浮层                   | `(message: string) => void`           | -             | —       |
| `success`      | 显示带勾号的成功状态提示             | `(message: string) => void`           | -             | —       |
| `error`        | 显示带叉号的失败状态提示             | `(message: string) => void`           | -             | —       |
| `modal`        | 弹出可交互的模态对话框               | `(params: UniNamespace.ShowModalOptions) => Promise<UniNamespace.ShowModalRes>` | -             | —       |

**参数说明**：
- `message`（`toast`/`success`/`error`）: 提示内容（字符串类型）。
- `params`（`modal`）: 模态对话框配置项，支持 `title`（标题）、`content`（内容）、`confirmText`（确认按钮文本）、`cancelText`（取消按钮文本）等 uni-app 原生属性。

---

## FAQ
### Q: toast 的持续时间可以修改吗？
A: 当前 `toast` 方法的 `duration` 固定为 2000ms（与 Taro 框架保持一致），暂不支持自定义。uni-app 原生默认值为 1500ms，请注意差异。

### Q: modal 可以添加更多按钮吗？
A: 不支持，uni-app 原生 `showModal` 仅支持确认/取消两个按钮。如需多按钮交互，建议使用 `showActionSheet` 或自定义组件。

---

## 注意事项

### 1. `toast(message: string): void`
**功能**：显示仅文字提示的浮层。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.toast('操作完成')
```

---

### 2. `success(message: string): void`
**功能**：显示带勾号的成功状态提示。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.success('保存成功')
```

---

### 3. `error(message: string): void`
**功能**：显示带叉号的失败状态提示。

**参数**：
- `message` (string): 提示内容。

**示例**：
```typescript
Message.error('网络连接失败')
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
  title: '提示',
  content: '确定要删除吗？',
  confirmText: '确认',
  cancelText: '取消'
}).then((result) => {
  if (result.confirm) {
    console.log('用户确认')
  }
  else {
    console.log('用户取消')
  }
})
```

---

## 注意事项
- `toast` 方法的 `duration` 默认值为 `2000ms`，与 Taro 框架保持一致，而 uni-app 默认为 `1500ms`。
- 模态对话框的样式和交互逻辑依赖 `uni-app` 的 API 实现，具体参数可参考 [uni.showModal 文档](https://uniapp.dcloud.io/api/ui/modal)。
