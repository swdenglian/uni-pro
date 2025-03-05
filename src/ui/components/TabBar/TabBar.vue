<script setup lang="ts">
import type { Screens } from '@/route.const'
import { Navigate } from '@/shared'
import { computed } from 'vue'
import SafeArea from '../SafeArea/SafeArea.vue'

interface TabBarItem {
  key: string
  icon: {
    size: {
      height: string
      width: string
    }
    normal: string
    active: string
  }
  text: string
  path: Screens
}

interface Props {
  items: Array<TabBarItem>
}

defineOptions({ name: 'TabBar' })
const props = defineProps<Props>()

/** 隐藏底部导航栏 */
uni.hideTabBar({})

function nav(path: string) {
  Navigate.switchTab({ url: path })
}

const current = getCurrentPages()[0]
const activeIndex = computed(() => {
  const index = props.items.findIndex((item) => {
    return item.path === `/${current.route}`
  })

  return index ?? 0
})
</script>

<template>
  <view class="tabBarWarp">
    <view class="tabBar">
      <view
        v-for="(item, index) in items" :key="item.key" class="tabBarItem" :class="{ active: activeIndex === index }"
        @click="nav(item.path)"
      >
        <image class="icon" :style="item.icon.size" :src="activeIndex === index ? item.icon.active : item.icon.normal" />
        <text class="text">
          {{ item.text }}
        </text>
      </view>
    </view>
    <SafeArea direction="bottom" />
  </view>
</template>

<style scoped lang="scss">
.tabBarWarp {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tabBar {
  height: 115rpx;

  display: flex;
  flex-direction: row;
  align-items: center;

  .tabBarItem {
    margin-top: 14rpx;
    margin-bottom: 11rpx;
    height: 90rpx;

    flex: 1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    .icon {
      width: 10rpx;
      height: 10rpx;
    }

    .text {
      color: #77788c;
      font-size: 22rpx;
    }

    &.active {
      .text {
        color: #07367B;
      }
    }
  }
}
</style>
