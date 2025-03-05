# Pagination 分页组件文档

## 简介

无限滚动分页组件，支持下拉刷新功能。组件通过 `fetch` 方法动态加载数据，自动处理分页逻辑和加载状态。

---

## Props

| 属性名        | 类型         | 默认值  | 说明                                            |
|------------|------------|------|-----------------------------------------------|
| `fetch`    | `Function` | -    | 必填，用于获取分页数据的异步函数，接收 `page` 和 `pageSize` 作为参数。 |
| `pageSize` | `number`   | `10` | 每页显示的数据条数。                                    |

---

## 事件

| 事件名       | 说明                          |
|-----------|-----------------------------|
| `load`    | 当数据加载完成时触发，携带当前页码和数据列表作为参数。 |

---

## 插槽

- **默认插槽**：用于渲染列表项，插槽参数为 `item`（当前遍历的数据项）。例如：
  ```html
  <template v-for="(item, index) in list" :key="index" name="item">
    <slot :item="item">默认列表项</slot>
  </template>
  ```

---

## 示例

```vue

<template>
  <Pagination
      :fetch="fetchData"
      :page-size="10"
  >
    <template #item="{ item }">
      <view>{{ item.name }}</view>
    </template>
  </Pagination>
</template>

<script setup>
  import {ref} from 'vue';

  const isLoading = ref(false);

  async function fetchData(page, pageSize) {
    // 模拟异步请求
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from({length: pageSize}, (_, i) => ({
          id: (page - 1) * 10 + i + 1,
          name: `Item ${(page - 1) * 10 + i + 1}`
        })));
      }, 1000);
    });
  }
</script>
```
