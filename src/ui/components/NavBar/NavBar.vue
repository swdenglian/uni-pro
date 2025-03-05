<script setup lang="ts">
import { Navigate } from '@/shared'
import { computed, watch } from 'vue'
import SafeArea from '../SafeArea/SafeArea.vue'

interface Props {
  useLeftArrow?: boolean
  transparent?: boolean
  text?: string
}

defineOptions({ name: 'NavBar' })
const props = withDefaults(defineProps<Props>(), {
  useLeftArrow: true,
})

watch(
  () => props.transparent,
  () => {
    uni.setNavigationBarColor({
      backgroundColor: 'transparent',
      frontColor: props.transparent ? '#ffffff' : '#000000',
    })
  },
  { immediate: true },
)

const arrowSrc = computed(() => {
  if (props.transparent) {
    return '/static/components/NavBar/white_arrow.png'
  }

  return '/static/components/NavBar/black_arrow.png'
})

function handleBack() {
  Navigate.back()
}
</script>

<template>
  <view class="navBarWarp" :class="{ transparent }">
    <SafeArea direction="top" />
    <view class="navBar">
      <view class="left" @click="handleBack">
        <image v-if="useLeftArrow" class="arrow" :src="arrowSrc" />
      </view>
      <view class="main">
        <text class="text">
          {{ text }}
        </text>
      </view>
      <view class="right" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.navBarWarp {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  position: relative;

  .navBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    height: 90rpx;

    .left,
    .right {
      width: 120rpx;
    }

    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .arrow {
        width: 24rpx;
        height: 42rpx;
        margin-left: 29rpx;
      }
    }

    .main {
      display: flex;
      flex-direction: row;
      justify-content: center;

      flex: 1;

      .text {
        color: #010101;
        font-size: 42rpx;
      }
    }
  }

  &.transparent {
    background-color: transparent;

    .navBar {
      background-color: rgba(0, 0, 0, 0);

      .main {
        .text {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
