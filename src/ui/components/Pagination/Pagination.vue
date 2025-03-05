<script lang="ts" setup>
import { onMounted, ref } from 'vue'

interface Props<T> {
  fetch: (page: number, pageSize: number) => Promise<Array<T>>
  pageSize: number
}

defineOptions({ name: 'Pagination' })
const props = defineProps<Props<any>>()

const list = ref<any[]>([])
const currentPage = ref(1)
const isLoading = ref(false)
const isRefreshLoading = ref(false)
const hasMore = ref(true)
const noData = ref(false)

// 加载数据方法
async function loadData(isRefresh = false) {
  if (isLoading.value || !hasMore.value)
    return

  if (isRefresh) {
    isRefreshLoading.value = true
  }

  try {
    const page = currentPage.value
    const data = await props.fetch(page, props.pageSize)
    if (data.length < props.pageSize) {
      hasMore.value = false
    }

    list.value = [...(page === 1 ? [] : list.value), ...data]
    noData.value = list.value.length === 0
  }
  catch (error) {
    console.error('加载失败:', error)
  }
  finally {
    isLoading.value = false
    isRefreshLoading.value = false
  }
}

// 下拉刷新
async function onRefresh() {
  currentPage.value = 1
  hasMore.value = true
  noData.value = false
  await loadData()
}

// 监听滚动到底部
async function onScrollToLower() {
  if (hasMore.value) {
    currentPage.value++

    await loadData()
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <scroll-view
    class="scroll-view"
    :scroll-y="true"
    :refresher-enabled="true"
    :refresher-triggered="isRefreshLoading"
    refresher-background="transparent"
    @scrolltolower="onScrollToLower"
    @refresherrefresh="onRefresh"
  >
    <!-- 无数据视图 -->
    <view v-if="noData" class="no-data">
      暂无数据
    </view>

    <!-- 列表项 -->
    <slot v-for="(item, index) in list" :key="index" name="item" :item="item" />

    <!-- 加载更多提示 -->
    <view v-if="isLoading && hasMore" class="loading-tip">
      加载中...
    </view>
    <view v-else-if="!hasMore && !noData" class="loading-tip">
      已无更多数据
    </view>
  </scroll-view>
</template>

<style scoped lang="scss">
.scroll-view {
  width: 100%;
  height: 100%; /* 根据实际需求设置高度 */
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 32rpx;
  color: #999;
}

.loading-tip {
  text-align: center;
  padding: 10rpx;
  color: #666;
}
</style>
