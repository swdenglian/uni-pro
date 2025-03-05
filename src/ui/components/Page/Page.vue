<script setup lang="ts">
import { computed, ref } from 'vue'
import NavBar from '../NavBar/NavBar.vue'
import AppTabBar from '../TabBar/AppTabBar.vue'
import { PageConst } from './PageConst'

type NavConfig = InstanceType<typeof NavBar>['$props']

interface Props {
  useNavBar?: boolean
  /** 是否使用底部导航栏 */
  useTabBar?: boolean
  navConfig?: NavConfig
  /** 是否沉浸式 */
  immersive?: boolean
  immersiveNavBgColor?: string
}

defineOptions({ name: 'Page' })
const props = withDefaults(defineProps<Props>(), {
  useNavBar: true,
  useTabBar: false,
})

const navHeight = computed(() => {
  if (!props.useNavBar) {
    return 0
  }

  return PageConst.NavHeight
})

const scrollTop = ref(0)

function handleScroll(e: any) {
  scrollTop.value = e.detail.scrollTop
}

const navBarStyle = computed(() => {
  if (props.immersive) {
    return {
      opacity: scrollTop.value / PageConst.NavHeight,
      backgroundColor: props.immersiveNavBgColor,
    }
  }

  return {}
})
</script>

<template>
  <view class="page" :class="{ immersive }">
    <view class="pageBackground">
      <slot name="background" :nav-height="navHeight" />
    </view>
    <view class="main">
      <view class="nav-bar">
        <view v-if="immersive" class="nav-bar-bg" :style="navBarStyle" />
        <NavBar
          v-if="useNavBar"
          v-bind="navConfig"
        />
      </view>
      <scroll-view v-if="immersive" :scroll-y="true" class="content" @scroll="handleScroll">
        <slot />
      </scroll-view>
      <view v-else class="content">
        <slot />
      </view>
      <AppTabBar v-if="useTabBar" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100vh;

  flex: 1;
  background-color: #f5f5f5;

  .pageBackground {
    z-index: 1;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .main {
    display: flex;
    flex-direction: column;

    z-index: 2;
    flex: 1;
    height: 0;

    .content {
      flex: 1;
      height: 0;

      display: flex;
      flex-direction: column;
    }
  }

  &.immersive {
    .main {
      .nav-bar {
        z-index: 999;

        position: absolute;
        top: 0;
        width: 100%;

        .nav-bar-bg {
          z-index: 0;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
