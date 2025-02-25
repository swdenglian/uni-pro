<script setup lang="ts">
import { ENV } from '@/data/env'
import { UserDomain } from '@/domain'
import { useCounterStore } from '@/domain/counter'
import { Screens } from '@/route.const'
import { Navigate } from '@/shared'
import { ref } from 'vue'

const title = ref('Hello')

const counter = useCounterStore()
counter.count++
// 自动补全！ ✨
counter.$patch({ count: counter.count + 1 })
// 或使用 action 代替
counter.increment()
counter.increment()

console.log(ENV)
console.log(import.meta.env)

UserDomain().login({} as any)

function toHomeDemo() {
  return Navigate.push({
    url: Screens.HomeDemo,
  })
}
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
    <button @click="toHomeDemo">
      toDemo
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
