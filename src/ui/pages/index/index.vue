<script setup lang="ts">
import { useCounterStore } from '@/domain/counter'
import { ref } from 'vue'

const title = ref('Hello')

const counter = useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
counter.increment()

const toIndex2 = () => uni.navigateTo({ url: '/ui/pages/index2/index' })
</script>

<template>
  <view class="content">
    <uni-badge text="1" />
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">
        {{ title }}
      </text>
      <text>Current Count: {{ counter.count }}</text>
    </view>
    <button @click="toIndex2">
      toIndex2
    </button>
  </view>
</template>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
