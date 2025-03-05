<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  direction: 'top' | 'bottom'
}

defineOptions({ name: 'SafeArea' })
const props = defineProps<Props>()

const { safeAreaInsets } = uni.getWindowInfo()

const style = computed(() => {
  if (props.direction === 'bottom') {
    return {
      height: `${safeAreaInsets.bottom}px`,
    }
  }

  if (props.direction === 'top') {
    return {
      height: `${safeAreaInsets.top}px`,
    }
  }

  return {}
})
</script>

<template>
  <view class="safe-area" :style="style" />
</template>

<style lang="scss" scoped>
.safe-area {
  width: 100%;
}
</style>
